<template>
<div>
  <div id="head" class="d-head">
    <div id="title">{{ spotName }}</div>

    <div id="search">
      <icon type="search" size="10" color="white"/>
      <div style="display:inline-block;width:90%;">
        <d-input
        placeholder="搜索向导"
        confirm-type="search"
        :value="searchValue"
        @input="handleSearchInput"
        @on-focus="handleSearchFocus"
        @on-enter="handleResetSearch"/>
      </div>
    </div>
  </div>

  <scroll-view
  v-if="!isSearch"
  class="scroll"
  :scroll-top="scrollTop"
  @scrolltolower="getGuides"
  scroll-y
  enable-back-to-top
  scroll-with-animation
  >
    <guide-profile-card
      v-for="guide in guides"
      :key="guide.id"
      :guide="guide"/>
    <div v-if="finishedLoading">
      <d-loading :loading="loading" />
      <d-no-more :has-more="hasMore" />
      <d-no-more :has-more="!hasMore || guides.length || loading"/>
    </div>
  </scroll-view>

  <section
  v-else
  class="d-search-list">
    <header>
    <div style="text-align:center;padding:10rpx;">
        <button
        class="d-back-btn-white"
        size="mini"
        plain
        @click="handleClickBack">
          返回
        </button>
        <button
        class="d-back-btn-white"
        style="margin-left:33rpx;"
        size="mini"
        plain
        @click="handleClearSearch">
          清空
        </button>
      </div>

    </header>

    <scroll-view
      class="scroll"
      scroll-y
      scroll-with-animation
      enable-back-to-top
      :style="heigthStyle"
      :scroll-top="searchScrollTop"
      @scrolltolower="handleScrollToSearch">
      <guide-profile-card
      v-for="guide in searchGuides"
      :color="'white'"
      :key="guide.id"
      :guide="guide"/>
      <div v-if="finishedLoading">
        <d-loading :loading="loading" :color="'white'"/>
        <d-no-more :has-more="searchHasMore" :color="'white'"/>
        <d-no-more :has-more="!searchHasMore || searchGuides.length || loading || firstSearch" :color="'white'"/>
      </div>
    </scroll-view>
  </section>
</div>
</template>

<script>
import touristApi from '../../api/tourist'

import GuideProfileCard from '../../components/guide/GuideProfileCard'
import DLoading from '../../components/common/DLoading'
import DInput from '../../components/common/DInput'
import DNoMore from '../../components/common/DNoMore'

import { D_SPOT_ID, D_SPOT_NAME } from '../../api/const/spotConst'
import {WINDOW_HEIGHT} from '../../api/const/commonConst'

const SHOW_TOP_SCROLLTOP = 700

export default {
  components: {
    GuideProfileCard,
    DLoading,
    DInput,
    DNoMore
  },
  data () {
    return {
      spotName: 'spotName',
      spotID: 'spotID',

      loading: false,

      hasMore: true,
      guides: [],

      isSearch: false,
      searchHasMore: true,
      searchWord: '',
      searchValue: undefined, // 用于清空搜索框
      searchGuides: [],
      firstSearch: true,

      finishedLoading: false,
      pageName: 'show_spot_guide',

      scrollTop: undefined,
      searchScrollTop: undefined,
      // 滑动高度
      scrollHeight: 500
    }
  },
  mounted() {
    this.finishedLoading = false
    // 取得景点ID
    this.spotID = wx.getStorageSync(D_SPOT_ID)
    if (!this.spotID) {
      wx.navigateBack();
      const errMsg = "取得景点ID失败";
      this.showErrorRoast(errMsg, fai);
      return
    }
    this.dLog("取得景点ID完成")

    // 取得景点名称
    this.spotName = wx.getStorageSync(D_SPOT_NAME)
    if (!this.spotName) {
      wx.navigateBack();
      const errMsg = "取得景点名称失败";
      this.showErrorRoast(errMsg, fai);
      return
    }
    this.dLog("取得景点名称完成")

    // 初始化数据
    this.hasMore = true;
    this.guides.splice(0, this.guides.length);// 清空原 guides 数组
    
    this.isSearch = false
    this.firstSearch = true
    this.searchHasMore = true
    this.searchWord = '';
    this.searchGuides.splice(0, this.searchGuides.length);// 清空原 searchGuides 数组
    
    // 屏幕高度
    this.scrollHeight = wx.getStorageSync(WINDOW_HEIGHT)
    
    this.finishedLoading = true

    this.getGuides();
  },
  computed: {
    heigthStyle () {
      return `height: ${this.scrollHeight}px`
    }
  },
  methods: {
    dLog (message, ...optionalParams) {
      console.log(this.pageName, message, optionalParams)
    },
    dError (message, ...optionalParams) {
      console.error(this.pageName, message, optionalParams)
    },
    showErrorRoast (errMsg, ...fai) {
      this.dError(errMsg, fai)

      // 输出提示信息
      wx.showToast({
        icon: 'none',
        title: errMsg
      })
    },
    scrollToTop () {
      this.dLog('scrollToTop 方法调用')

      if (this.isSearch) {
        this.searchScrollTop = 0
        setTimeout(
            () => {
              this.searchScrollTop = undefined
            }, 500)
      } else {
        this.scrollTop = 0
        setTimeout(
            () => {
              this.scrollTop = undefined
            }, 500)
      }

      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
    },
    getGuides () {
      this.dLog('getGuides 方法调用')

      if (this.loading) {
        this.dLog('加载中 return')
        return
      }

      // 加载
      this.hasMore = true;
      this.loading = true;

      // 保留下上次最后的index
      let lastIndex = this.guides.length

      // 取得导游列表
      touristApi.queryGuideBySpot(
        this.spotID,
        lastIndex,
        (res) => {
          this.dLog('通过景点取得导游列表成功', res)

          this.hasMore = res.hasMoreGuide

          for (let key in res.guideList) {
            this.guides.push(res.guideList[key])
          }
          this.loading = false
        },
        (rej) => {
          this.showErrorRoast('通过景点取得导游列表失败', rej)
          this.loading = false
        }
      )
    },
    handleSearchFocus (event) {
      this.dLog('handleSearchFocus 方法调用', event)
      this.isSearch = true
    },
    handleSearchInput (e) {
      this.dLog('handleInput 方法调用', e)
      this.searchWord = e
      this.dLog(`message 更新 ${this.message}`)
    },
    handleResetSearch (event) {
      this.dLog('handleResetSearch 方法调用', event)

      // 非空检查
      if (!this.searchWord) {
        this.showErrorRoast('请输入搜索关键词w')
        return
      }

      this.searchHasMore = true
      this.firstSearch = false
      this.searchGuides.splice(0, this.searchGuides.length)// 清空搜索的 spot 数组

      // 重新搜索

      // 加载
      this.loading = true

      // 上滑到顶部
      this.scrollToTop()

      // 按照关键词搜索向导
      touristApi.queryGuideByKeyword(
        this.searchWord,
        0,
        (res) => {
          this.dLog('搜索向导列表成功', res)

          this.searchHasMore = res.hasMoreGuide;

          for (let key in res.guideList) {
            this.searchGuides.push(res.guideList[key])
          }

          this.loading = false
        },
        (fai) => {
          this.showErrorRoast('搜索向导列表失败')

          this.loading = false
        }
      )
    },
    handleScrollToSearch (event) {
      this.dLog('handleScrollToSearch 方法调用', event)

      if (this.loading) {
        this.dLog('加载中 return')
        return
      }

      // 加载
      this.searchHasMore = true;
      this.loading = true;

      // 保留下上次最后的index
      let lastIndex = this.searchGuides.length

      // 按照关键词搜索向导
      touristApi.queryGuideByKeyword(
        this.searchWord,
        lastIndex,
        (res) => {
          this.dLog('通过关键词搜索导游列表成功', res)

          this.searchHasMore = res.hasMoreGuide

          for (let key in res.guideList) {
            this.searchGuides.push(res.guideList[key])
          }

          this.loading = false
        },
        (rej) => {
          this.showErrorRoast('通过关键词搜索导游列表失败', rej)

          this.loading = false
        }
      )
    },
    handleClickBack (event) {
      this.dLog('handleClickBack 方法调用', event)

      // 清空
      this.handleClearSearch(event)

      this.isSearch = false
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
      this.searchHasMore = true
      this.searchGuides.splice(0, this.searchGuides.length)// 清空搜索的 spot 数组

      // 回滚
      this.scrollToTop()
    }
  }
}
</script>

<style>

#title {
  text-align: left;
  font-size: 1.3em;
  font-weight: bold;
  color: white;
}

#search {
  margin: 20rpx 0;
  font-size: 0.8em;
}

.scroll {
  /*height: 1000rpx;*/
}
</style>
<style scoped src="../../assets/style/d-head.css"/>
<style scoped src="../../assets/style/d-search-list.css"/>
<style scoped src="../../assets/style/d-btn.css"/>
