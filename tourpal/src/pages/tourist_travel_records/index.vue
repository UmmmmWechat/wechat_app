<!--suppress ALL -->
<template>
  <div>
    <div id="timeline-wrapper">
      <d-timeline :events="events"/>
    </div>
    <d-loading :loading="loading"/>
    <d-no-more :has-more="hasMore" />
    <d-no-more :has-more="!hasMore || events.length || loading"/>
  </div>
</template>

<script>
import touristApi from '../../api/tourist'
import commonApi from '../../api/common'

import DLoading from '../../components/common/DLoading'
import DNoMore from '../../components/common/DNoMore';
import DTimeline from '../../components/common/DTimeline'
import {TOURIST_ID} from "../../components/tourist/constant";
import OrderState from  '../../utils/OrderState'

export default {
  components: {
    DLoading,
    DNoMore,
    DTimeline
  },
  data () {
    return {
      events: [],
      touristId: '',
      loading: false,
      hasMore: true,
      pageName: "tourist_travel_record"
    }
  },
  mounted () {
    // 获取touristId参数
    this.touristId = wx.getStorageSync(TOURIST_ID)
    if (!this.touristId) {
      // 跳回
      wx.navigateBack()

      // 未找到游客ID
      this.showErrorRoast('粗错啦QWQ 没有找到你的ID');

      return
    }

    // 获取 events
    this.getEvents();
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
    getEvents() {
      this.dLog("getEvents 方法响应")

      if(this.loading) {
        return;
      }
      if(!this.hasMore) {
        return;
      }

      this.loading = true;

      const lastIndex = this.events.length;

      touristApi.queryOrders(
        this.touristId,
        OrderState.FINISHED,
        lastIndex,
        (res) => {
          this.dLog("取得完成邀请成功")

          this.hasMore = res.hasMoreOrder

          this.transOrdersToEvents(res.orderList)

          this.loading = false;
        },
        (err) => {
          this.showErrorRoast("粗错啦QWQ暂时找不到")
          this.loading = false;
        }
      )
    },
    transOrdersToEvents(orderList) {
      this.dLog("transOrdersToEvents", orderList);

      for (let i = 0; i < orderList.length; i++) {
        let order = orderList[i]
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
            break;
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

        const onFail = (fai) => {
          this.showErrorRoast("邀请记录粗错啦QWQ")
          this.loading = false;
        }
        
        // 查询向导姓名
        commonApi.queryBasicGuideById(
          order.guideId,
          (res) => {
            this.dLog("取得基本导游信息成功", res)
            const guide = res
            event.content += `和${guide.realName}一起游玩了`
            // 查询景点名称
            commonApi.querySpotById(
              order.spotId,
              (res) => {
                this.dLog("取得景点信息成功", res)
                const spot = res
                event.content += `景点${spot.name}，${spotCommend}，${guideCommend}。`
              },
              onFail
            )
          },
          onFail
        )

        this.events.push(event)
      }
    }
  }
}
</script>

<style scoped>
#timeline-wrapper {
  margin: 40rpx 0;
}

</style>
