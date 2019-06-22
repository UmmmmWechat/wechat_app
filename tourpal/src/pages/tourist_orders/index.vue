<template>
  <div>
    <div id="search" class="d-head">
      <icon type="search" size="10" color="white"/>
      <div style="display:inline-block;width:90%;">
        <d-input
          placeholder="搜索邀请"
          confirm-type="search"
          :value="searchValue"
          :placeholder-style="'color:rgba(255,255,255,0.9)'"
          @input="handleSearchInput"
          @on-focus="handleSearchFocus"
          @on-enter="handleResetSearch"/>
      </div>
    </div>

    <div
      v-if="isSearch"
      class="d-search-list">
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

      <order-list-tourist
        :color="'white'"
        :orders="searchOrders"
        :loading="loading"
        :has-more="searchHasMore"
        :first-search="firstSearch"
        @scrolltolower="handleScrollToSearch"
        @on-cancel="handleResetSearch"/>
    </div>

    <div v-else>
      <div id="navigator-bar">
        <d-navigator-bar
          :menus="menus"
          :current="current"
          @on-change="onNavigatorChange"/>
      </div>

      <div
        id="swiper-wrapper">
        <swiper
          class="swiper"
          :current="current"
          :style="heightStyle"
          @change="handleSwiperChange">

          <swiper-item class="swiper-item">
            <!-- WAITING -->
            <order-list-tourist :orders="ordersArray[0]"
                                :loading="loadingArray[0]"
                                :has-more="hasMoreArray[0]"
                                @scrolltolower="queryOrders"
                                @on-cancel="handleCancelOrder"/>
          </swiper-item>

          <swiper-item class="swiper-item">
            <!-- ONGOING -->
            <order-list-tourist :orders="ordersArray[1]"
                                :loading="loadingArray[1]"
                                :has-more="hasMoreArray[1]"
                                @scrolltolower="queryOrders"/>
          </swiper-item>

          <swiper-item class="swiper-item">
            <!-- FINISHED -->
            <order-list-tourist :orders="ordersArray[2]"
                                :loading="loadingArray[2]"
                                :has-more="hasMoreArray[2]"
                                @scrolltolower="queryOrders"/>
          </swiper-item>

          <swiper-item class="swiper-item">
            <!-- INVALID -->
            <invalid-tourist-order-page/>
          </swiper-item>

        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
  import touristApi from '../../api/tourist'

  import DNavigatorBar from '../../components/common/DNavigatorBar'
  import DInput from '../../components/common/DInput'
  import OrderListTourist from '../../components/order/OrderList'
  import InvalidTouristOrderPage from '../../components/tourist/InvalidTouristOrderPage'

  import {STATE_MENU, STATES_ARRAY, TOURIST_ID, WAITING_STATE, INVALID_STATE} from '../../api/const/touristConst'
  import {WINDOW_HEIGHT} from '../../api/const/commonConst'
  import {ROLE_SELECT} from '../pages_url'

  export default {
    components: {
      DNavigatorBar,
      OrderListTourist,
      DInput,
      InvalidTouristOrderPage
    },
    data () {
      return {
        touristId: undefined,
        windowHeight: 500,

        loading: false,

        searchHasMore: true,
        isSearch: false,
        searchWord: '',
        searchValue: undefined, // 用于清空搜索框
        searchOrders: [],
        firstSearch: true,

        menus: STATE_MENU,
        current: WAITING_STATE,

        hasMoreArray: [
          true, true, true
        ],
        ordersArray: [
          [], [], [], []
        ],
        loadingArray: [
          false, false, false
        ],

        pageName: 'tourist_orders'
      }
    },
    computed: {
      heightStyle () {
        return `height: ${this.windowHeight}px`
      }
    },
    mounted () {
      this.windowHeight = wx.getStorageSync(WINDOW_HEIGHT)
      console.log(this.windowHeight)

      this.touristId = wx.getStorageSync(TOURIST_ID)
      if (!this.touristId) {
        // 未找到游客ID 需要先去登录
        const url = `/${ROLE_SELECT}`
        this.dLog('跳转', url)
        wx.redirectTo({url})

        this.showErrorToast('未找到游客ID 需要先去登录')

        return
      }

      this.isSearch = false
      this.firstSearch = true
      this.searchHasMore = true
      this.searchWord = ''
      this.searchOrders.splice(0, this.searchOrders.length)// 清空原 searchOrders 数组

      this.queryOrders()
    },
    onShow () {
      this.ordersArray = [
        [], [], []
      ]

      const index = this.current
      this.loadingArray.splice(index, 1, false)

      if (this.touristId) {
        this.queryOrders()
      }
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
      queryOrders (...event) {
        this.dLog('queryOrders 方法响应', event, this.loadingArray)

        const index = this.current

        if (this.loadingArray[index]) {
          this.dLog('加载中 return')
          return
        }

        if (index === INVALID_STATE) {
          this.dLog('invalid!')
          return
        }

        // 加载
        this.hasMoreArray.splice(index, 1, true)
        this.loadingArray.splice(index, 1, true)

        // 保留下上次最后的index
        let lastIndex = this.ordersArray[index].length
        this.dLog(this.touristId)

        touristApi.queryOrders(
          this.touristId,
          STATES_ARRAY[index],
          lastIndex,
          (res) => {
            this.dLog('取得邀请列表成功', res, index)

            this.hasMoreArray[index] = res.hasMoreOrder

            this.ordersArray[index].push(...res.orderList)

            this.dLog(this.loadingArray)
            this.loadingArray.splice(index, 1, false)

            this.dLog(this.loadingArray)
          },
          (rej) => {
            this.showErrorToast('取得邀请列表失败', rej, index)

            // this.loadingArray[index] = false
            this.loadingArray.splice(index, 1, false)
          }
        )
      },
      onNavigatorChange (index) {
        this.current = index
        if (this.ordersArray[index] && !this.ordersArray[index].length) {
          this.queryOrders()
        }

        this.dLog(`onNavigatorChange 方法响应 index: ${index}`)
      },
      handleSwiperChange (event) {
        this.current = event.target.current
        if (this.ordersArray[this.current] && !this.ordersArray[this.current].length) {
          this.queryOrders()
        }
        this.dLog('handleSwiperChange 方法响应', event)
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
        this.searchOrders.splice(0, this.searchOrders.length)// 清空搜索的 spot 数组

        // 重新搜索

        // 按照关键词搜索邀请
        this.searchOrderByKeyword(0)
      },
      handleScrollToSearch (event) {
        this.dLog('handleScrollToSearch 方法调用', event)

        if (this.loading) {
          this.dLog('加载中 return')
          return
        }
        if (!this.searchHasMore) {
          this.dLog('已经加载全部 return')
          return
        }

        // 按照关键词搜索邀请
        this.searchOrderByKeyword(this.searchOrders.length)
      },
      searchOrderByKeyword (lastIndex) {
        // 加载
        this.loading = true

        touristApi.queryOrdersByKeyword(
          this.touristId,
          this.searchWord,
          lastIndex,
          (res) => {
            this.dLog('搜索邀请列表成功', res)

            this.searchHasMore = res.hasMoreOrder

            this.searchOrders.push(...res.orderList)

            this.loading = false
          },
          () => {
            this.showErrorToast('搜索邀请列表失败')

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
        this.dLog('handleClickBack 方法调用', event)

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
        this.searchOrders.splice(0, this.searchOrders.length)// 清空搜索的 spot 数组
      },
      handleCancelOrder (orderId) {
        this.dLog('取消一个邀请，orderId为', orderId)
        // this
        const index = this.current
        const orders = this.ordersArray[index]
        // 去掉这一个
        orders.splice(
          orders.findIndex(item => item.id === orderId),
          1
        )
      }
    }
  }
</script>

<style scoped>
  .swiper {
    padding: 40px 0;
  }

  .btn-wrapper {
    text-align: center;
    padding: 10px;
  }

  #search {
    color: white;
    font-size: 0.8em;
  }

  #navigator-bar {
    margin-top: 20px;
  }

  .clear-btn {
    margin-left: 33px;
  }
</style>

<style scoped src="../../assets/style/d-head.css"></style>
<style scoped src="../../assets/style/d-search-list.css"></style>
<style scoped src="../../assets/style/d-btn.css"></style>
