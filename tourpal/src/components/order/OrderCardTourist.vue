<!-- 邀请卡片，也就是一项订单，这个是为tourist准备的-->
<!-- 发射事件 on-cancel(orderId) -->
<template>
  <div class="d-card" :style="{backgroundColor: color}">
    <div class="error-wrapper" v-if="errorOccur">
      粗错啦 QWQ
    </div>
    <div v-else>
      <div id="body">
        <div>
          <span class="title-span">景点：</span>
          <span v-if="order.state === ongoing" class="link" @click="onSpotNameClicked">{{ spotName }}</span>
          <span v-else>{{ spotName }}</span>
        </div>

        <div>
          <span class="title-span">导游：</span>
          <span v-if="order.state === ongoing" class="link" @click="onGuideNameClicled">{{ guideName }}</span>
          <span v-else>{{ guideName }}</span>
        </div>

        <div><span class="title-span">邀请日期：</span>{{ computedCreatedDate }}</div>

        <div><span class="title-span">旅游日期：</span>{{ computedTravelDate }}</div>

        <div v-if="order.state === finished && order.feedback.comment">
          <span class="title-span">旅行印象：</span>
          <span>{{ order.feedback.comment }}</span>
        </div>
      </div>

      <div
        class="foot"
        v-if="order.state === waiting">
        <button
          class="d-a"
          size="mini"
          @click="handleCancel">
          撤回
        </button>
      </div>

      <div
        class="foot"
        v-if="order.state === ongoing && rateAble">
        <button
          class="d-a"
          size="mini"
          @click="handleRate">
          评价
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import commonApi from '../../api/common'
  import touristApi from '../../api/tourist'

  import * as ResultMessage from '../../api/returnMessage'
  import {formatTime} from '../../utils/dUtils'

  import {
    STATES_ARRAY,
    WAITING_STATE,
    CHECK_GUIDE,
    CHECK_SPOT,
    ONGOING_STATE,
    RATE_ORDER,
    FINISHED_STATE
  } from '../../api/const/touristConst'
  import {SHOW_SPOT_PAGE, SHOW_GUIDE_PAGE, TOURIST_RATE_ORDER} from '../../pages/pages_url'

  export default {
    props: {
      order: {
        type: Object,
        required: true
      },
      color: {
        type: String
      }
    },
    data () {
      return {
        componentName: 'OrderCardTourist',
        waiting: STATES_ARRAY[WAITING_STATE],
        ongoing: STATES_ARRAY[ONGOING_STATE],
        finished: STATES_ARRAY[FINISHED_STATE],
        rateAble: false,

        errorOccur: false,
        guideName: '',
        spotName: ''
      }
    },
    computed: {
      computedTravelDate () {
        if (!this.order) return ''
        return formatTime(new Date(this.order.travelDate));
      },
      computedCreatedDate () {
        if (!this.order) return ''
        return formatTime(new Date(this.order.generatedDate));
      }
    },
    mounted () {
      this.errorOccur = false
      this.rateAble = false

      // 取得 spot
      const onGetSpotFail = (fai) => {
        this.dError('取得spot失败', fai)
        this.errorOccur = true
      }

      commonApi.querySpotById(
        this.order.spotId,
        (res) => {
          this.dLog('取得景点信息成功', res)
          this.spotName = res.name
          this.order.spot = res
          if (!this.order.spot) {
            onGetSpotFail(res)
          }
        },
        onGetSpotFail
      )

      // 取得导游
      const onGetGuideFail = (fai) => {
        this.dError('取得guide失败', fai)
        this.errorOccur = true
      }

      const onGetGuideSuc = (res) => {
        this.guideName = res.realName
        this.order.guide = res
        if (!this.order.guide) {
          onGetGuideFail(res)
        }
      };

      if (this.order.state === this.ongoing) {
        commonApi.queryGuideById(
          this.order.guideId,
          onGetGuideSuc,
          onGetGuideFail
        );
        const today = Date.now();
        this.rateAble = today >= new Date(this.order.travelDate).getTime()
      } else {
        commonApi.queryBasicGuideById(
          this.order.guideId,
          onGetGuideSuc,
          onGetGuideFail
        );
      }
    },
    methods: {
      dLog (message, ...optionalParams) {
        console.log(this.componentName, message, optionalParams)
      },
      dError (message, ...optionalParams) {
        console.error(this.componentName, message, optionalParams)
      },
      onSpotNameClicked (event) {
        this.dLog('onSpotNameClicked 方法响应', event)
        wx.setStorageSync(CHECK_SPOT, this.order.spot);
        const url = `/${SHOW_SPOT_PAGE}`
        this.dLog('跳转', url)
        wx.navigateTo({url})
      },
      onGuideNameClicled (event) {
        this.dLog('onGuideNameClicled 方法响应', event)
        wx.setStorageSync(CHECK_GUIDE, this.order.guide);
        const url = `/${SHOW_GUIDE_PAGE}`
        this.dLog('跳转', url)
        wx.navigateTo({url})
      },
      handleCancel () {
        wx.showModal({
          title: '确定要撤回这个邀请么？',
          success: (res) => {
            console.log(res)
            if (res.confirm) {
              // api
              touristApi.cancelOrders(
                this.order.id,
                () => {
                  wx.showToast({
                    title: '邀请撤销成功',
                    icon: 'none'
                  })
                  this.$emit('on-cancel', this.order.id)
                },
                (err) => {
                  let title = ''
                  if (err === ResultMessage.ALREADY_ACCEPTED) {
                    title = '邀请已经被接受，不能撤回'
                    this.$emit('on-cancel', this.order.id)
                  } else if (err === ResultMessage.ALREADY_REJECTED) {
                    title = '邀请已经被回拒'
                    this.$emit('on-cancel', this.order.id)
                  } else {
                    title = '回撤失败，请重试'
                  }
                  wx.showToast({
                    title: title,
                    icon: 'none'
                  })
                }
              )
            }
          }
        })
      },
      handleRate () {
        wx.setStorage({
          key: RATE_ORDER,
          data: this.order,
          success: () => {
            const url = `/${TOURIST_RATE_ORDER}`
            this.dLog('跳转', url)
            wx.navigateTo({url})
          }
        })
      }
    }
  }
</script>

<style scoped>
  .error-wrapper {
    text-align: center;
    padding: 20px;
  }

  #head {
    padding-right: 20px;
    padding-top: 10px;
    text-align: right;
  }

  #body {
    padding: 20px;
    color: black;
    color: gray;
  }

  .foot {
    text-align: right;
    padding: 0 20px 20px 0;
  }

  .title-span {
    font-weight: bold;
  }

  .link {
    text-decoration: underline;
  }
</style>
<style scoped src="../../assets/style/d-card.css"></style>
<style scoped src="../../assets/style/d-a.css"></style>

