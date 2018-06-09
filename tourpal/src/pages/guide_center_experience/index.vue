<template>
<scroll-view
  class="scroll"
  scroll-y
  enable-back-to-top
  @scrolltolower="handleScrollToLower"
  :style="scrollViewStyle">
  <d-timeline :events="events"></d-timeline>
  <d-loading :loading="loading"></d-loading>
  <d-no-more :has-more="hasMore"></d-no-more>
</scroll-view>
</template>

<script>
import DTimeline from '../../components/common/DTimeline'
import DNoMore from '../../components/common/DNoMore'
import DLoading from '../../components/common/DLoading'
import guideApi from '../../api/guide'
import commonApi from '../../api/common'
import {GUIDE_ID, FINISHED_STATE} from '../../api/const/guideConst'
export default {
  components: {DLoading, DNoMore, DTimeline},
  data () {
    return {
      header: '向导履历',
      events: [],
      guideId: '',
      loading: false,
      hasMore: true,
      scrollHeight: 600
    }
  },
  computed: {
    scrollViewStyle () {
      return 'height:' + this.scrollHeight + 'px'
    }
  },
  mounted () {
    // this.guideId = wx.getStorageSync(GUIDE_ID)
    let sysInfo = wx.getSystemInfoSync()
    console.log(sysInfo)
    this.scrollHeight = sysInfo.windowHeight
    console.log(`${this.scrollHeight}px`)
    this.guideId = 1
    if (!this.guideId) {
      wx.showToast({
        title: '获取用户信息失败',
        icon: 'none'
      })
      return
    }
    this.getMoreOrders()
  },
  methods: {
    getMoreOrders () {
      this.loading = true
      let lastIndex = this.events.length
      guideApi.queryOrders(
        this.guideId,
        FINISHED_STATE,
        lastIndex,
        res => {
          this.loading = false
          let that = this
          res.orderList.forEach(
            that.translateToEvent
          )
          if (this.events.length === lastIndex) {
            this.hasMore = false
          }
        },
        err => {
          console.log(err)
          wx.showToast({
            title: '时间轴更新失败',
            icon: 'none'
          })
          this.loading = false
        }
      )
    },
    handleScrollToLower (event) {
      console.log(event)
      if (this.loading || !this.hasMore) {
        return
      }
      this.getMoreOrders()
    },
    translateToEvent (order) {
      let event = {
        date: new Date(order.travelDate).toLocaleDateString(),
        content: ''
      }
      this.events.push(event)
        // 事件内容
      let content = `带领id为${order.id}的游客一起游玩了`
        // 获取景点名
      commonApi.querySpotById(
          order.spotId,
          (spot) => {
            content += `景点${spot.name}，`
            let feedback = spot.feedback
            if (!feedback) {
              event.content = content
              return
            }
            let guideComment = ''
            switch (feedback.guidePoint) {
              case 0:
                guideComment = '游客觉得我差劲orz。。。'
                break
              case 1:
              case 2:
                guideComment = '游客觉得我一般般吧。'
                break
              case 3:
              case 4:
                guideComment = '游客对我赞赏有佳。'
                break
              case 5:
                guideComment = '游客觉得我很赞！'
                break
            }
            content += guideComment
            event.content = content
          },
          (err) => {
            console.log(err)
          }
        )
    }
  }
}
</script>

<style scoped>
.scroll {
  height: 1000rpx;
}
</style>
