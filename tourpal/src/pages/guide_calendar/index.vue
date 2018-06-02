<template>
  <section>
    <section>
      <calendar
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
import GuideApi from "../../api/guide"

export default {
  components: {
    Calendar,
    OrderListMini
  },
  data() {
    return {
      orders: []
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
    clickDay(data) {
      console.log(data); //选中某天
    },
    changeDate(data) {
      console.log(data); //左右点击切换月份
    },
  }
}
</script>

<style>

</style>
