<template>
  <section>
    <section>
      <calendar
        :mark-date="markedDate"
      v-on:choseDay="clickDay"
      v-on:changeMonth="changeDate"/>
    </section>
    <section>
      <order-list-mini
      :orders="orders"/>
    </section>
  </section>
</template>

<script>
import Calendar from "../../components/guide/Calendar"
import OrderListMini from "../../components/order/OrderListMini"
import guideApi from "../../api/guide"
import {GUIDE_ID} from "../../api/const/guideConst";

export default {
  components: {
    Calendar,
    OrderListMini
  },
  data() {
    return {
      orders: [],
      ordersGroupByDate: {},
      markedDate: [],
      guideId: ''
    }
  },
  mounted() {
    this.getOrders()
  },
  methods: {
    getOrders () {
      try {
        this.guideId = wx.getStorageSync(GUIDE_ID)
      } catch (e) {
        wx.showToast({
          title: '获取id失败',
          icon: 'none'
        })
        return
      }
      guideApi.queryOngoingOrdersGroupByDate(
        this.guideId,
        (res) => {
          this.ordersGroupByDate = res
          for (let key in this.ordersGroupByDate) {
            this.markedDate.push(key)
          }
          console.log(this.markedDate)
          let date = new Date().toLocaleDateString()
          let orders = this.ordersGroupByDate[date]
          if (orders) {
            this.orders = orders
          }
        },
        (err) => {
          console.log(err)
        }
      )
    },
    clickDay (data) {
      let date = new Date(data).toLocaleDateString()
      let orders = this.ordersGroupByDate[date]
      if (orders) {
        this.orders = orders
      } else {
        this.orders = []
      }
    },
    changeDate(data) {
      console.log(data); //左右点击切换月份
    },
  }
}
</script>

<style>

</style>
