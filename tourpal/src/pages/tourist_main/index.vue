<template>
  <div>
    <div id="head" class="d-head">
      <div id="user-info-div">
        <span>欢迎：
        <open-data type="userNickName"/>
        </span>
        <!--<span-->
        <!--class="underline-span"-->
        <!--@click="handleToPersonCenter">-->
        <!--</span>-->
      </div>
      <d-location-picker :location="location" @on-change="handleLocationChange" />
      <div id="search">
        <icon type="search" size="10" color="white"/>
        <div style="display:inline-block;width:90%;">
          <d-input
            placeholder="搜索景点"
            confirm-type="search"
            :value="searchValue"
            :placeholder-style="'color:rgba(255,255,255,0.9)'"
            @input="handleSearchInput"
            @on-focus="handleSearchFocus"
            @on-enter="handleResetSearch"/>
        </div>
      </div>
    </div>

    <scroll-view
      v-if="!isSearch"
      class="scroll"
      scroll-y
      scroll-with-animation
      enable-back-to-top
      :scroll-top="scrollTop"

      @scrolltolower="handleGetMoreSpots">
      <spot-card
        v-for="spot in spots"
        :key="spot.id"
        :spot="spot"
      />
      <div v-if="finishedLoading">
        <d-loading :loading="loading"/>
        <d-no-more :has-more="hasMore"/>
      </div>
    </scroll-view>

    <section
      v-else
      class="d-search-list">
      <header>
        <div
          class="btn-wrapper">
          <button
            class="d-back-btn-white"
            size="mini"
            plain
            @click="handleClickBack">
            返回
          </button>
          <button
            class="d-back-btn-white clear-btn"
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
        :scroll-top="searchScrollTop"
        @scrolltolower="handleScrollToSearch">
        <spot-card
          v-for="spot in searchSpots"
          :key="spot.id"
          :spot="spot"/>
        <div v-if="finishedLoading">
          <d-loading :loading="loading" :color="'white'"/>
          <d-no-more :has-more="searchHasMore" :color="'white'"/>
        </div>
      </scroll-view>
    </section>

    <div style="width: 100%; height: 50Px"></div>

    <TouristTabBar v-bind:current="currentTab"/>
  </div>
</template>


<script>
  import SpotCard from '../../components/spot/SpotCard'
  import DInput from '../../components/common/DInput'
  import DLoading from '../../components/common/DLoading'
  import DNoMore from '../../components/common/DNoMore'
  import DLocationPicker from '../../components/common/DLocationPicker'

  import spotApi from '../../api/spot'

  import {TOURIST_ID} from '../../api/const/touristConst'
  import {DEFAULT_LOCATION} from '../../api/const/spotConst'
  import {MOCK_TOURIST_ID} from '../../api/mock/tourist_mock_data'
  import {TOURIST_CENTER, ROLE_SELECT} from '../pages_url'
  import TouristTabBar from "../../components/tourist/TouristTabBar";
  import {TOURIST_HOME} from "../../utils/TabbarConfig";

  export default {
    components: {
      TouristTabBar,
      SpotCard,
      DInput,
      DLoading,
      DNoMore,
      DLocationPicker
    },
    data () {
      return {
        touristId: MOCK_TOURIST_ID,

        location: DEFAULT_LOCATION,

        loading: false,

        hasMore: true,
        spots: [],

        searchHasMore: true,
        isSearch: false,
        searchWord: '',
        searchValue: undefined, // 用于清空搜索框
        searchSpots: [],
        firstSearch: true,

        finishedLoading: false,
        pageName: 'tourist_main',

        scrollTop: undefined,
        searchScrollTop: undefined,

        currentTab: TOURIST_HOME.name
      }
    },
    mounted () {
      this.finishedLoading = false

      this.touristId = wx.getStorageSync(TOURIST_ID)
      if (!this.touristId) {
        // 未找到游客ID 需要先去登录
        const errMsg = '未找到游客ID 需要先去登录'
        this.dError(errMsg)

        // 输出提示信息
        wx.showToast({
          icon: 'none',
          title: errMsg
        })

        const url = `/${ROLE_SELECT}`
        this.dLog('跳转', url)
        wx.redirectTo({url})

        return
      }

      this.hasMore = true
      this.spots.splice(0, this.spots.length)// 清空原 spots 数组

      this.isSearch = false
      this.firstSearch = true
      this.searchHasMore = true
      this.searchWord = ''
      this.searchSpots.splice(0, this.searchSpots.length)// 清空原 searchSpots 数组

      this.finishedLoading = true

      this.getSpots()
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
      searchScrollToTop () {
        this.dLog('searchScrollToTop 方法调用')

        this.searchScrollTop = 0
        setTimeout(
          () => {
            this.searchScrollTop = undefined
          }, 500)

        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        })
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
      },
      getSpots () {
        this.dLog('getSpots 方法调用')

        if (this.loading) {
          this.dLog('加载中 return')
          return
        }

        // 加载
        this.hasMore = true
        this.loading = true

        // 保留下上次最后的index
        let lastIndex = this.spots.length

        // 取得景点列表
        spotApi.querySpots(
          this.location,
          lastIndex,
          (res) => {
            this.dLog('取得景点列表成功', JSON.stringify(res))

            this.hasMore = res.hasMoreSpot

            this.spots.push(...res.spotList)

            this.loading = false
          },
          () => {
            this.showErrorToast('取得景点列表失败')

            this.loading = false
          }
        )
      },
      handleLocationChange (newLocation) {
        this.dLog('handleLocationChange 方法调用', this.location, newLocation, newLocation.province)

        if (this.location.province === newLocation.province &&
          this.location.city === newLocation.city) {
          // 检查是否发生了变动
          this.dLog('所在城市未变动')
        } else {
          this.dLog('所在城市变动 原 location:', this.location)

          // 检查该城市是否支持
          spotApi.checkLocationAvailable(
            newLocation,
            (res) => {
              this.dLog('检查所在城市是否支持成功', res)

              if (res.isAvailable) {
                // 支持该地区
                this.location = newLocation

                if (this.isSearch) {
                  this.handleResetSearch('location 变动')
                } else {
                  this.resetSpots()

                  wx.pageScrollTo({
                    scrollTop: 0,
                    duration: 300
                  })
                }
              } else {
                // 不支持该地区
                this.showErrorToast(res.errMsg)
              }
            },
            (rej) => {
              this.showErrorToast('检查所在城市是否支持失败', rej)
            }
          )
        }
      },
      resetSpots (resolve) {
        // 初始化景点信息
        this.hasMore = true
        this.spots.splice(0, this.spots.length)// 清空原 spot 数组

        // 上滑到顶部
        this.scrollTop = 0
        setTimeout(
          () => {
            this.scrollTop = undefined
          }, 500)

        // 重新获取景点信息

        // 加载
        this.loading = true

        // 取得景点列表
        spotApi.querySpots(
          this.location,
          0,
          (res) => {
            this.dLog('取得景点列表成功', res)

            this.hasMore = res.hasMoreSpot

            this.spots.push(...res.spotList)

            this.loading = false

            if (resolve) {
              resolve()
            }
          },
          (err) => {
            this.showErrorToast('取得景点列表失败', err)

            this.loading = false
          }
        )
      },
      handleGetMoreSpots (event) {
        this.dLog('handleGetMoreSpots 方法调用', event)
        this.getSpots()
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
          this.showErrorToast('请输入搜索关键词w')
          return
        }

        this.searchHasMore = true
        this.firstSearch = false
        this.searchSpots.splice(0, this.searchSpots.length)// 清空搜索的 spot 数组

        // 重新搜索

        // 加载
        this.loading = true

        // 上滑到顶部
        this.searchScrollToTop()

        // 按照关键词搜索景点
        spotApi.querySpotsByKeywordAndCity(
          this.searchWord,
          this.location.city,
          0,
          (res) => {
            this.dLog('搜索景点列表成功', res)

            this.searchHasMore = res.hasMoreSpot

            this.searchSpots.push(...res.spotList)

            this.loading = false
          },
          (fai) => {
            this.showErrorToast('搜索景点列表失败', fai)

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
        this.searchHasMore = true
        this.loading = true

        // 保留下上次最后的index
        let lastIndex = this.searchSpots.length

        // 按照关键词搜索景点
        spotApi.querySpotsByKeywordAndCity(
          this.searchWord,
          this.location.city,
          lastIndex,
          (res) => {
            this.dLog('搜索景点列表成功', res)

            this.searchHasMore = res.hasMoreSpot

            this.searchSpots.push(...res.spotList)

            this.loading = false
          },
          () => {
            this.showErrorToast('搜索景点列表失败')

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
        this.searchSpots.splice(0, this.searchSpots.length)// 清空搜索的 spot 数组

        // 回滚
        this.searchScrollToTop()
      },
      handleToPersonCenter (event) {
        this.dLog('handleToPersonCenter 方法调用', event)

        const url = `/${TOURIST_CENTER}`
        this.dLog('跳转', url)
        wx.navigateTo({url})
      }
    }
  }
</script>

<style scoped>
  #head {
    color: white;
    z-index: 100;
  }

  #user-info-div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .underline-span {
    text-decoration: underline;
  }

  #search {
    font-size: 0.8em;
  }

  .scroll {
    height: 1200px;
  }

  .btn-wrapper {
    text-align: center;
    padding: 10px;
  }

  .clear-btn {
    margin-left: 33px;
  }
</style>

<style scoped src="../../assets/style/d-head.css"></style>
<style scoped src="../../assets/style/d-search-list.css"></style>
<style scoped src="../../assets/style/d-btn.css"></style>
