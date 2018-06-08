<!--suppress ALL -->
<template>
  <div>
    <!-- :style="{height: screenHeight + 'px'}" -->
      <div id="timeline-wrapper">
        <d-timeline :events="events"/>
      </div>
  </div>
</template>

<script>
import touristApi from '../../api/tourist'
import commonApi from '../../api/common'

import DLoading from '../../components/common/DLoading'
import DTimeline from '../../components/common/DTimeline'
import {TOURIST_ID} from "../../components/tourist/constant";
import OrderState from  '../../utils/OrderState'

export default {
  components: {
    DLoading,
    DTimeline
  },
  data () {
    return {
      orders: [],
      events: [],
      touristId: '',
      isLoading: false,
      hasMore: true,
      screenHeight: 1200
    }
  },
  mounted () {
    // 获取touristId参数
    wx.getStorage({
      key: TOURIST_ID,
      success: (res) => {
        let id = res.data
        // 获取完成的
        touristApi.queryOrders(
          id,
          OrderState.FINISHED,
          this.orders.length,
          (res) => {
            console.log(res)
            for (let i = 0; i < res.length; i++) {
              let order = res[i]
              let feedback = order.feedback
              // 景点的评价
              let spotCommend = ''
              switch (feedback.spotPoint) {
                case 1:
                case 2:
                  spotCommend = '景点一般'
                  break;
                case 3:
                case 4:
                  spotCommend = '景点不错'
                  break;
                case 5:
                  spotCommend = '景点太棒了'
                  break
              }
              let event = {
                date: new Date(order.travelDate).toLocaleDateString(),
                content: ''
              }
              // 导游的评价
              let guideCommend = ''
              switch (feedback.guidePoint) {
                case 1:
                case 2:
                  guideCommend = '向导一般'
                  break;
                case 3:
                case 4:
                  guideCommend = '向导人还不赖嘛'
                  break;
                case 5:
                  guideCommend = '向导人超好的'
                  break
              }
              // 查询向导姓名
              commonApi.queryGuideById(
                order.guideId,
                (guide) => {
                  event.content += `和${guide.realName}一起游玩了`
                  // 查询景点名称
                  commonApi.querySpotById(
                    order.spotId,
                    spot => {
                      event.content += `景点${spot.name}，${spotCommend}，${guideCommend}。`
                    }
                  )
                },
                (err) => {}
                )
              this.events.push(event)
            }
          },
          (err) => {
            wx.showToast({
              title: '游记获取失败',
              icon: 'none'
            })
          }
        )
      }
    })
  },
  computed: {
    // events () {
    //   return this.orders.map(
    //     item => {
    //       return {
    //         date: item.travelDate,
    //         content: ``
    //       }
    //     }
    //   )
    // }
  },
  methods: {
    getOrders () {
      if(this.loading) return;
      if(!this.hasMore) return;
      this.loading = true;
        touristApi.queryOrders(
          this.touristId,
          'finished',
          -1,
          (orders) => {
            if(orders === undefined || orders.length === 0) {
              this.loading = false;
              this.hasMore = false;
            }
            for (let key in orders) {
              this.orders.push(orders[key]);
            }
            this.loading = false;
          },
          (err) => {}
        )
    }
  }
}
</script>

<style scoped>
#timeline-wrapper {
  margin: 40rpx 0;
}

</style>
