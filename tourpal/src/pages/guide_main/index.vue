<template>
  <div>
    <div id="head" class="d-head">
      <div>
        <span>欢迎&emsp;</span>
        <span
          class="underline_span"
          @click="handleGuideNameClicked">
          {{ guide.realName }}
        </span>
      </div>
    </div>

    <div id="body">
      <order-list-guide
        :type="guideType"
        :loading="loading"
        :hasMore="hasMore"
        :orders="orders"
        @on-accept="handleOrderChanged"
        @on-cancel="handleOrderChanged"
        @on-reject="handleOrderChanged"/>
    </div>

    <div style="width: 100%; height: 50Px"></div>
    <GuideTabBar v-bind:current="currentTab"/>
  </div>
</template>

<script>
  import OrderListGuide from '../../components/order/OrderList'

  import guideApi from '../../api/guide'

  import {GUIDE_ID, GUIDE_INFO, STATES_ARRAY, WAITING_STATE} from '../../api/const/guideConst'
  import {GUIDE_TYPE} from '../../api/const/orderConst'
  import {GUIDE_CENTER, ROLE_SELECT, GUIDE_SIGN_UP} from '../pages_url'
  import GuideTabBar from "../../components/guide/GuideTabBar";
  import {GUIDE_HOME} from "../../utils/TabbarConfig";

  export default {
    components: {
      GuideTabBar,
      OrderListGuide
    },
    data () {
      return {
        guide: {},
        guideType: GUIDE_TYPE,
        orders: [],
        hasMore: true,
        loading: false,
        pageName: 'guide_main',
        currentTab: GUIDE_HOME.name
      }
    },
    onShow () {
      this.hasMore = true
      this.loading = true

      // 取得 向导ID
      this.guide.id = wx.getStorageSync(GUIDE_ID)
      if (!this.guide.id) {
        const errMsg = '向导ID获取失败'

        const url = `/${ROLE_SELECT}`
        this.dLog('跳转', url)
        wx.redirectTo({url})

        this.showErrorRoast(errMsg)
        return
      }

      // 取得向导信息
      this.getUserInfo()
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
      getUserInfo () {
        this.dLog('getUserInfo 方法响应')

        guideApi.queryUserInfo(
          this.guide.id,
          (res) => {
            this.dLog('取得向导信息成功', res)
            this.guide = res
            // 存储向导信息
            wx.setStorage({
              key: GUIDE_INFO,
              data: this.guide,
              success: (suc) => {
                // 存储向导信息成功
                this.dLog('存储向导信息成功', suc)
                this.loading = false
                this.getOrders()
              }
            })
          },
          (rej) => {
            const errMsg = '粗错啦QWQ没有找到你的向导信息\n请重新注册'
            this.loading = false

            const url = `/${GUIDE_SIGN_UP}`
            this.dLog('跳转', url)
            wx.redirectTo({url})

            this.showErrorRoast(errMsg, rej)
          }
        )
      },
      getOrders () {
        this.dLog('getOrders 方法响应')

        if (this.loading) {
          this.dLog('加载中 return')
          return
        }
        if (!this.hasMore) {
          this.dLog('已经加载全部 return')
          return
        }

        // 改为正在loading
        this.loading = false

        this.orders.splice(0, this.orders.length)// 清空原 orders 数组

        // 取得等待中的邀请
        guideApi.queryOrders(
          this.guide.id,
          STATES_ARRAY[WAITING_STATE],
          -1,
          (res) => {
            this.dLog('取得等待中的邀请完成', res)

            this.hasMore = res.hasMore

            this.orders.push(...res.orderList)

            this.loading = false
          },
          (err) => {
            const errMsg = '粗错啦QWQ没找到你的邀请'
            this.showErrorRoast(errMsg, err)

            this.loading = false
          })
      },
      handleGuideNameClicked () {
        this.dLog('跳转到向导的个人中心')
        const url = `/${GUIDE_CENTER}`
        this.dLog('跳转', url)
        wx.switchTab({url})
      },
      handleOrderChanged (orderId) {
        this.dLog('一个邀请需要被删除，orderId为', orderId)
        // 去掉这一个
        this.orders.splice(
          this.orders.findIndex(item => item.id === orderId),
          1
        )
      }
    }

  }
</script>

<style>
  #head {
    color: white;
    z-index: 100;
  }

  .underline_span {
    text-decoration: underline;
  }

</style>

<style scoped src="../../assets/style/d-head.css"></style>
<style scoped src="../../assets/style/d-search-list.css"></style>
<style scoped src="../../assets/style/d-btn.css"></style>
