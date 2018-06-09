<template>
  <div>
    <div id="head" class="d-head">
      <div>
        <span>欢迎&emsp;</span>
        <span
        class="underline_span"
        @click="handleGuideNameClicked"
        >{{ guideName }}</span>
      </div>
    </div>

    <div id="body">
      <order-list-guide
        :type="guideType"
        :orders="orders"/>
    </div>
  </div>
</template>

<script>
import OrderListGuide from "../../components/order/OrderList"
import GuideApi from "../../api/guide"

export default {
  components: {
    OrderListGuide
  },
  data() {
    return {
      guideName: '体验向导',
      guideType: 'guide',
      orders: [],
      orderType: 'guide'
    }
  },
  mounted() {
    this.getOrders()
  },
  methods: {
    getOrders() {
      GuideApi.queryOrders(
        'guideId',
        'waiting',
        -1,
        (res) => {
          this.orders = res
        },
        (err) => {
          console.log(err)
        })
    },
    handleGuideNameClicked(event) {
      console.log("跳转到向导的个人中心")
      wx.switchTab({
        url: '/pages/guide_center/main',
        success: (suc) => {
          console.log("success", suc)
        },
        fail: (fai) => {
          console.log("fail", fai)
        }
      })
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

<style scoped src="../../assets/style/d-head.css" />
<style scoped src="../../assets/style/d-search-list.css" />
<style scoped src="../../assets/style/d-btn.css"/>
