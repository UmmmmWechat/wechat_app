<template>
  <section>
    <section>
      <calendar
        :mark-date="markedDate"
        @onChangeDay="onChangeDay" />
    </section>
    <section>
      <div
        style="text-align: center; color: gray; padding: 20px;"
        v-if="!orders.length">
        当日没有安排
      </div>
      <div v-else>
        <order-list-mini
          :orders="orders"/>
      </div>
    </section>
    <div style="width: 100%; height: 50Px"></div>
    <GuideTabBar v-bind:current="currentTab"/>
  </section>
</template>

<script>
  import Calendar from '../../components/common/DCalendar'
  import OrderListMini from '../../components/order/OrderListMini'
  import guideApi from '../../api/guide'
  import {GUIDE_ID} from '../../api/const/guideConst'
  import GuideTabBar from "../../components/guide/GuideTabBar";
  import {GUIDE_CALENDAR} from "../../utils/TabbarConfig";

  export default {
    components: {
      GuideTabBar,
      Calendar,
      OrderListMini
    },
    data () {
      return {
        orders: [],
        ordersGroupByDate: {},
        markedDate: [],
        guideId: '',
        currentTab: GUIDE_CALENDAR.name
      }
    },
    onShow () {
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
              if (this.ordersGroupByDate.hasOwnProperty(key)) {
                this.markedDate.push(key)
              }
            }
            console.log('markedDate: ', this.markedDate)
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
      onChangeDay (data) {
        let date = new Date(data).toLocaleDateString()
        console.log('clickDay', data)
        let orders = this.ordersGroupByDate[date]
        if (orders) {
          this.orders = orders
        } else {
          this.orders = []
        }
      }
    }
  }
</script>

<style>

</style>
