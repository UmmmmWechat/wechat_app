<template>
  <scroll-view
    class="scroll"
    scroll-y
    enable-back-to-top
    @scrolltolower="handleScrollToLower"
    :style="scrollViewStyle">
    <div id="timeline-wrapper">
      <d-timeline :events="events"/>
    </div>
    <div v-if="finishedLoading">
      <d-loading :loading="loading"/>
      <d-no-more :has-more="hasMore"/>
      <!--TODO 不明-->
      <!--<d-no-more :has-more="!hasMore || events.length || loading"/>-->
    </div>
  </scroll-view>
</template>

<script>
  import touristApi from '../../api/tourist'
  import commonApi from '../../api/common'

  import DLoading from '../../components/common/DLoading'
  import DNoMore from '../../components/common/DNoMore'
  import DTimeline from '../../components/common/DTimeline'
  import {WINDOW_HEIGHT} from '../../api/const/commonConst'
  import OrderState from '../../api/const/OrderState'
import { TOURIST_ID } from '../../api/const/touristConst';

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
        finishedLoading: false,
        pageName: 'tourist_travel_record',
        scrollHeight: 500
      }
    },
    computed: {
      scrollViewStyle () {
        return `height: ${this.scrollHeight}px`
      }
    },
    mounted () {
      this.finishedLoading = false

      this.scrollHeight = wx.getStorageSync(WINDOW_HEIGHT)
      console.log('height', this.scrollHeight)
      // 获取touristId参数
      this.touristId = wx.getStorageSync(TOURIST_ID)
      // this.touristId = 1
      if (!this.touristId) {
        // 跳回
        wx.navigateBack()

        // 未找到游客ID
        this.showErrorToast('粗错啦QWQ 没有找到你的ID')

        return
      }

      // 初始化数据
      this.hasMore = true

      this.finishedLoading = true

      // 获取 events
      this.getEvents()
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
      getEvents () {
        this.dLog('getEvents 方法响应')

        if (this.loading) {
          return
        }

        this.hasMore = true
        this.loading = true

        const lastIndex = this.events.length

        touristApi.queryOrders(
          this.touristId,
          OrderState.FINISHED,
          lastIndex,
          (res) => {
            this.dLog('取得完成邀请成功')

            this.hasMore = res.hasMoreOrder

            this.transOrdersToEvents(res.orderList)

            this.loading = false
          },
          () => {
            this.showErrorToast('粗错啦QWQ暂时找不到')
            this.loading = false
          }
        )
      },
      transOrdersToEvents (orderList) {
        this.dLog('transOrdersToEvents', orderList)

        orderList.forEach(this.translateToEvent)
      },
      translateToEvent (order) {
        let feedback = order.feedback

        let event = {
          date: new Date(order.travelDate).toLocaleDateString(),
          content: ''
        }
        this.events.push(event)
        if (!feedback) return

        // 景点的评价
        let spotCommend = ''
        switch (feedback.spotPoint) {
          case 0:
            spotCommend = '感觉景点很不好'
            break
          case 1:
          case 2:
            spotCommend = '景点一般'
            break
          case 3:
          case 4:
            spotCommend = '景点不错'
            break
          case 5:
            spotCommend = '景点太棒了'
            break
        }

        // 导游的评价
        let guideCommend = ''
        switch (feedback.guidePoint) {
          case 0:
            guideCommend = '导游太差劲了'
            break
          case 1:
          case 2:
            guideCommend = '导游一般'
            break
          case 3:
          case 4:
            guideCommend = '导游人还不赖嘛'
            break
          case 5:
            guideCommend = '导游人超好的'
            break
        }

        const onFail = () => {
          this.showErrorToast('邀请记录粗错啦QWQ')
          this.loading = false
        }

        // 查询导游姓名
        commonApi.queryBasicGuideById(
          order.guideId,
          (guide) => {
            this.dLog('取得基本导游信息成功', guide)
            event.content += `和${guide.realName}一起游玩了`
            // 查询景点名称
            commonApi.querySpotById(
              order.spotId,
              (spot) => {
                this.dLog('取得景点信息成功', spot)
                event.content += `景点${spot.name}，${spotCommend}，${guideCommend}。`
              },
              onFail
            )
          },
          onFail
        )
      },
      handleScrollToLower () {
        this.getEvents()
      }
    }
  }
</script>

<style scoped>
  #timeline-wrapper {
    margin: 40px 0;
  }
</style>
