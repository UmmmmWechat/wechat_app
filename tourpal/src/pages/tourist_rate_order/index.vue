<template>
  <div id="out">
    <div v-if="order.spot" id="rate-spot" class="rate-item">
      <spot-card
      :spot="order.spot"
      :noAction="true"/>
    </div>
    <div v-if="order.guide" id="rate-guide" class="rate-item">
      <guide-card
      :guide="order.guide"
      :invitable="false"/>
    </div>
    <div>
      <div class="form-item">
        <span class="label">给景点评分</span>
        <slider
          :min="0" :max="5" 
          show-value
          value="5"
          @change="handleSpotPointChange">
        </slider>
      </div>
      <div class="form-item">
        <span class="label">给向导评分</span>
        <slider 
          :min="0" :max="5" 
          show-value
          value="5"
          @change="handleGuidePointChange">
        </slider>
      </div>
    </div>
    <d-textarea
      label="留言"
      placeholder="请留下你对这次旅行的看法"
      @input="handleCommentChange"/>
    <div id="btn-wrapper">
      <button
      type="primary"
      @click="handleSubmitRating">确定</button>
    </div>
  </div>
</template>

<script>
import touristApi from '../../api/tourist'

import SpotCard from '../../components/spot/SpotCard'
import GuideCard from '../../components/guide/GuideProfileCard'
import DTextarea from '../../components/common/DTextarea'
import { RATE_ORDER } from '../../api/const/touristConst'
export default {
  components: {
    SpotCard,
    GuideCard,
    DTextarea
  },
  data () {
    return {
      order: {},
      feedback: {
        guidePoint: 5,
        spotPoint: 5,
        comment: ''
      },
      pageName: 'tourist_rate_order'
    }
  },
  mounted () {
    // 取得 order
    this.order = wx.getStorageSync(RATE_ORDER)
    if (!this.order) {
      // 跳回
      wx.navigateBack()

      // 未找到向导ID
      this.showErrorRoast('粗错啦QWQ没有找到你的邀请')
      return
    }

    // 初始化数据
    this.feedback.guidePoint = 5
    this.feedback.spotPoint = 5
    this.feedback.comment = ''
  },
  methods: {
    dLog(message, ...optionalParams) {
        console.log(this.pageName, message, optionalParams);
    },
    dError(message, ...optionalParams) {
        console.error(this.pageName, message, optionalParams);
    },
    handleSubmitRating (event) {
      this.dLog('handleSubmitRating 方法响应', event)
      
      // 检查评价
      if (!this.feedback.comment) {
        const msg = '游客未评价'
        this.dLog(msg, this.feedback)
        wx.showModal({
          title: `真的不说点什么吗`,
          success: (res) => {
            if (res.confirm) {
              // 如果没有评价，提供默认评价
              this.dLog('确认拒绝', res)
              this.feedback.comment = '游客未评价'
            } else {
              // 拒绝，继续评价
              return
            }
          }
        })

        return
      }

      // 发起网络请求
      this.postHttpRating()
    },
    postHttpRating() {
      this.dLog('postHttpRating 方法响应')

      // 发起网络请求
      touristApi.commendOrder(
        this.order.id,
        this.feedback,
        (res) => {
          this.dLog('提交评价成功', res, this.feedback)

          // 跳回
          wx.navigateBack()

          // 显示提示信息
          wx.showToast({
            title: '评价订单成功',
            icon: 'none'
          })
        },
        (err) => {
          const errMsg = '评价订单失败了，请稍后重试'

          this.dLog(errMsg, err, this.feedback)

          wx.showToast({
            title: errMsg,
            icon: 'none'
          })
        }
      )
    },
    handleSpotPointChange(event) {
      this.dLog("handleSpotPointChange 方法响应", event)
      this.feedback.spotPoint = event.target? event.target.value: '';
      this.dLog("feedback属性改变", this.feedback)
    },
    handleGuidePointChange(event) {
      this.dLog("handleGuidePointChange 方法响应", event)
      this.feedback.guidePoint = event.target? event.target.value: '';
      this.dLog("feedback属性改变", this.feedback)
    },
    handleCommentChange(event) {
      this.dLog("handleCommentChange 方法响应", event)
      this.feedback.comment = event;
      this.dLog("feedback属性改变", this.feedback)
    }
  }
}
</script>


<style scoped>
#out {
  padding: 40rpx 10rpx;
}

.rate-item {
  margin: 40rpx 0;
}

.form-item {
  padding: 20rpx 10rpx;
}

.label {
  color: gray;
  text-align: left;
}
</style>
