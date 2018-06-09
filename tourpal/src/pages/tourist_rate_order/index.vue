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
        <slider :min="0" :max="5" show-value :value="feedback.spotPoint" @change="feedback.spotPoint = $event.target.value;"></slider>
      </div>
      <div class="form-item">
        <span class="label">给向导评分</span>
        <slider :min="0" :max="5" show-value :value="feedback.guidePoint"  @change="feedback.guidePoint = $event.target.value;"></slider>
      </div>
    </div>
    <d-textarea
      label="留言"
      placeholder="请留下你对这次旅行的看法"
      :value="feedback.comment"
      @input="feedback.comment = $event.target.value;"/>
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
      }
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
  },
  methods: {
    handleSubmitRating (event) {
      // 如果没有评价，提供默认评价
      if (!this.feedback.comment) {
        this.feedback.comment = '游客未评价'
      }
      touristApi.commendOrder(
        this.order.id,
        this.feedback,
        (res) => {
          wx.navigateBack()
          wx.showToast({
            title: '评价订单成功',
            icon: 'none'
          })
        },
        (err) => {
          wx.showToast({
            title: '评价订单失败了，请稍后重试',
            icon: 'none'
          })
        }
      )
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
