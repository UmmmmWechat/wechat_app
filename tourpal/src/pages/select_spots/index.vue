/*
在这里可以选择景点
首先是按关键字搜索出景点，然后选择它们
可多选，可删除选择

完成选择后，会将选择的 spot 作为一个数组存入 微信的 storage, key 为 selectedSpots， 并后退一个页面
请在接下来的页面自行调用 getStorage获得选择的 spots

IMPORTANT!!!!!!!!! 请在其他页面 获得spots之后，将其存储清除，避免下次使用时出错
*/
<template>
  <div>
    <div id="search">
      <icon type="search" size="10" color="black"/>
      <div class="input-wrapper">
        <d-input
          placeholder="搜索景点"
          confirm-type="search"
          :value="searchValue"
          @input="searchWord = $event"
          @on-enter="handleResetSearch"/>
      </div>
    </div>

    <div id="selected-list">
      <div
        v-for="spot in selectedSpots"
        :key="spot.id"
        class="selected-item">
        <div class="spot-name-wrapper">
          {{ spot.name }}
        </div>
        <div @click="handleRemoveSpot(spot)">
          <icon type="cancel" size="20" color="red"></icon>
        </div>
      </div>
    </div>

    <div id="btn-div">
      <button
        class="btn-wrapper"
        size="mini"
        :disabled="!searchWord"
        @click="handleClearSearch">
        清空搜索
      </button>
      <button
        class="btn-wrapper"
        size="mini"
        :disabled="!selectedSpots.length"
        @click="handleClearSelect">
        清空所选
      </button>
      <button
        size="mini"
        class="btn-wrapper"
        type="primary"
        @click="handleSubmit">
        确定选择
      </button>
    </div>

    <div id="result-list">
      <scroll-view
        class="scroll"
        scroll-with-animation
        enable-back-to-top
        scroll-y
        :style="heightStyle"
        :scroll-top="scrollTop"
        @scrolltolower="handleGetMoreSpots">
        <div
          v-for="spot in spots"
          :key="spot.id"
          class="spot-item d-card">
          <div>
            <div>
              {{ spot.name }}
            </div>
            <div style="color: gray; font-size:0.8em;">
              {{ spot.location.province + '-' + spot.location.city }}
            </div>
            <div class="select-button-wrapper">
              <button
                class="btn-wrapper"
                size="mini"
                @click="handleSelectSpot(spot)">
                选择
              </button>
            </div>
          </div>
        </div>

        <div v-if="finishedLoading">
          <d-loading :loading="loading"/>
          <d-no-more :has-more="hasMore"/>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
  import DNoMore from '../../components/common/DNoMore'
  import DLoading from '../../components/common/DLoading'
  import DInput from '../../components/common/DInput'

  import spotApi from '../../api/spot'
  import {SELECTED_SPOTS} from '../../api/const/guideConst'
  import {WINDOW_HEIGHT} from '../../api/const/commonConst'

  export default {
    components: {
      DInput,
      DNoMore,
      DLoading
    },
    data () {
      return {
        spots: [],

        searchWord: '',
        searchValue: undefined, // 用于清空搜索框
        selectedSpots: [],
        loading: false,
        hasMore: true,
        firstSearch: true,

        finishedLoading: false,
        pageName: 'select_spots',

        scrollHeight: 500
      }
    },
    computed: {
      heigthStyle () {
        return `height: ${this.scrollHeight}px`
      }
    },
    mounted () {
      this.finishedLoading = false

      // 初始化数据
      this.firstSearch = true
      this.spots = []
      this.selectedSpots = []
      this.searchWord = ''
      this.hasMore = true
      this.loading = false

      this.finishedLoading = true

      this.refreshFavorSpots()
      this.scrollHeight = wx.getStorageSync(WINDOW_HEIGHT)
    },
    methods: {
      dLog (message, ...optionalParams) {
        console.log(this.pageName, message, optionalParams)
      },
      dError (message, ...optionalParams) {
        console.error(this.pageName, message, optionalParams)
      },
      showErrorToast (errMsg, ...fai) {
        this.dError(errMsg, fai)

        // 输出提示信息
        wx.showToast({
          icon: 'none',
          title: errMsg
        })
      },
      refreshFavorSpots () {
        this.dLog('refreshFavorSpots 方法响应')
        this.selectedSpots.splice(0, this.selectedSpots.length)// 清空原 spot 数组

        this.selectedSpots = wx.getStorageSync(SELECTED_SPOTS)
        if (!this.selectedSpots) {
          this.dLog('没找到 favorSpots')
          this.selectedSpots = []
        }
      },
      handleGetMoreSpots (event) {
        this.dLog('handleGetMoreSpots 方法调用', event)

        if (this.loading) {
          this.dLog('加载中 return')
          return
        }

        // 加载
        this.hasMore = true
        this.loading = true

        // 保留下上次最后的index
        let lastIndex = this.spots.length

        // 按照关键词搜索景点
        spotApi.querySpotsByKeyword(
          this.searchWord,
          lastIndex,
          (res) => {
            this.dLog('搜索景点列表成功', res)

            this.hasMore = res.hasMoreSpot

            this.spots.push(...res.spotList)

            this.loading = false
          },
          () => {
            this.showErrorToast('搜索景点列表失败')

            this.loading = false
          }
        )
      },
      handleResetSearch (event) {
        this.dLog('handleResetSearch 方法调用', event)

        // 非空检查
        if (!this.searchWord) {
          this.showErrorToast('请输入搜索关键词w')
          return
        }

        this.hasMore = true
        this.firstSearch = false
        this.spots.splice(0, this.spots.length)// 清空搜索的 spot 数组

        // 重新搜索

        // 加载
        this.loading = true

        // 上滑到顶部
        this.scrollToTop()

        // 按照关键词搜索景点
        spotApi.querySpotsByKeyword(
          this.searchWord,
          0,
          (res) => {
            this.dLog('搜索景点列表成功', res)

            this.hasMore = res.hasMoreSpot

            this.spots.push(...res.spotList)

            this.loading = false
          },
          (fai) => {
            this.showErrorToast('搜索景点列表失败', fai)

            this.loading = false
          }
        )
      },
      handleSelectSpot (spot) {
        this.dLog('handleSelectSpot 方法响应', spot)

        if (this.selectedSpots.findIndex(
          item => item.id === spot.id
        ) !== -1) {
          // 已经选过了
          const errMsg = '这个景点已经被你承包啦！'
          this.showErrorToast(errMsg)
          return
        }

        this.selectedSpots.push(spot)
        this.spots.splice(
          this.spots.findIndex(
            item => item.id === spot.id
          ),
          1
        )
      },
      handleRemoveSpot (spot) {
        this.dLog('handleRemoveSpot 方法响应', spot)

        this.spots.push(spot)
        this.selectedSpots.splice(
          this.selectedSpots.findIndex(
            item => item.id === spot.id
          ),
          1
        )
      },
      handleClearSelect () {
        this.dLog('handleClearSelect 方法响应')

        this.spots.push(...this.selectedSpots)
        this.selectedSpots = [];
      },
      handleSubmit () {
        this.dLog('handleSubmit 方法响应')

        if (this.selectedSpots.length === 0) {
          const errMsg = '请至少选择一个景点'
          this.showErrorToast(errMsg)
          return
        }

        wx.setStorage({
          key: SELECTED_SPOTS,
          data: this.selectedSpots,
          success: () => {
            const sucMsg = '保存景点成功'
            this.dLog(sucMsg, this.selectedSpots)

            wx.navigateBack()

            // 回滚
            this.scrollToTop()
          }
        })
      },
      handleClearSearch (event) {
        this.dLog('handleClearSearch 方法调用', event)

        // 清空搜索框
        this.searchValue = ''
        setTimeout(
          () => {
            this.searchValue = undefined
          }, 500
        )

        // 重置属性
        this.searchWord = ''
        this.firstSearch = true
        this.hasMore = true
        this.spots.splice(0, this.spots.length)// 清空搜索的 spot 数组

        // 回滚
        this.scrollToTop()
      },
      scrollToTop () {
        this.dLog('scrollToTop 方法调用')

        this.scrollTop = 0
        setTimeout(
          () => {
            this.scrollTop = undefined
          }, 500)

        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        })
      }
    }
  }
</script>

<style scoped>
  #search {
    margin: 20px;
    padding-left: 20px;
    font-size: 0.8em;
    border: gray 1px solid;
    border-radius: 5px;
  }

  #selected-list {
    margin: auto;
    width: 700px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  #result-list {
    padding: 20px;
    margin-bottom: 100px;
  }

  .scroll {
    height: 1200px;
  }

  .spot-item {
    margin: 20px 0;
    padding: 20px;
    border-bottom:thin solid rgba(0,0,0,0.1);
  }

  .select-button-wrapper {
    text-align:right;
    font-size: 0.8em;
    margin-top: -2.8em;
  }

  .selected-item {
    margin: 10px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 10px;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    text-align: center;

    font-size: 30px;
    height: 50px;
    line-height: 50px;
  }

  #btn-div {
    background-color: white;
    box-shadow: gray -1px 0 1px;
    width: 100%;
    text-align: center;
    position: fixed;
    bottom: 0;
    z-index: 100;
  }

  .input-wrapper {
    margin-left: 10px;
    display: inline-block;
    width: 90%;
    color: black;
  }

  .spot-name-wrapper {
    margin: 0 10px;
  }

  .btn-wrapper {
    margin: 10px;
  }
</style>
