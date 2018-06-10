<template>
<scroll-view
  v-if="finishedLoading"
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
import { ROLE_SELECT } from '../pages_url';
export default {
  components: {DLoading, DNoMore, DTimeline},
  data () {
    return {
      header: '向导履历',
      events: [],
      guideId: '',
      loading: false,
      hasMore: true,
      scrollHeight: 600,
      finishedLoading: false,
      pageName: 'guide_center_experience'
    }
  },
  computed: {
    scrollViewStyle () {
      return 'height:' + this.scrollHeight + 'px'
    }
  },
  mounted () {
    this.finishedLoading = false
    this.guideId = wx.getStorageSync(GUIDE_ID)
    if (!this.guideId) {
      // 登录失效
      const url = `/${ROLE_SELECT}`;
      this.dLog('跳转', url);
      wx.redirectTo({ url });

      wx.showToast({
        title: '获取用户信息失败，请重新登录',
        icon: 'none'
      })
      return
    }

    let sysInfo = wx.getSystemInfoSync()
    this.dLog(sysInfo)
    this.scrollHeight = sysInfo.windowHeight
    this.dLog(`${this.scrollHeight}px`)
    this.finishedLoading = true
    
    this.getMoreOrders()
  },
  methods: {
    dLog(message, ...optionalParams) {
        console.log(this.pageName, message, optionalParams);
    },
    dError(message, ...optionalParams) {
        console.error(this.pageName, message, optionalParams);
    },
    showErrorToast(errMsg, ...fai) {
      this.dError(errMsg, fai);
      
      // 输出提示信息 
      wx.showToast({
          icon: 'none',
          title: errMsg
      });
    },
    getMoreOrders () {
      this.loading = true
      let lastIndex = this.events.length
      guideApi.queryOrders(
        this.guideId,
        FINISHED_STATE,
        lastIndex,
        res => {
          this.dLog('取得邀请列表成功', res)
          let that = this

          res.orderList.forEach(
            that.translateToEvent
          )

          this.hasMore = res.hasMoreOrder

          this.loading = false
        },
        err => {
          const errMsg = '粗错啦QWQ时间轴更新布鸟辣'
          this.loading = false
          this.showErrorToast(errMsg, err)
        }
      )
    },
    handleScrollToLower (event) {
      this.dLog(event)
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
            this.dError(err)
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
