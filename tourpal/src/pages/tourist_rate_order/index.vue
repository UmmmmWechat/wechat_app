<template>
  <div id="out">
    <div id="rate-spot" class="rate-item">
      <spot-card 
      :spot="order.spot" 
      :noAction="true"/>
      <div class="form-item">
        <span class="label">给景点评分</span>
        <slider :min="1" :max="5" show-value @change="rateSpot = $event.target.value;"/>
      </div>
    </div>
    <div id="rate-guide" class="rate-item">
      <guide-card 
      :guide="order.guide"
      :invitable="false"/>
      <div class="form-item">
        <span class="label">给向导评分</span>
        <slider :min="1" :max="5" show-value  @change="rateGuide = $event.target.value;"/>
      </div>
    </div>
    <d-textarea label="留言" placeholder="请留下你对这次旅行的看法" />
    <div id="btn-wrapper">
      <button 
      type="primary"
      @click="handleSumitRating">确定</button>
    </div>
  </div>
</template>

<script>
import touristApi from '../../api/tourist'

import SpotCard from '../../components/spot/SpotCard'
import GuideCard from '../../components/guide/GuideProfileCard'
import DTextarea from '../../components/common/DTextarea'
import { RATE_ORDER } from '../../api/const/touristConst';
export default {
  components: {
    SpotCard,
    GuideCard,
    DTextarea
  },
  data () {
    return {
      order: {},
      rateSpot: 1,
      rateGuide: 1
    }
  },
  mounted () {
    // 取得 order
    this.order = wx.getStorageSync(RATE_ORDER);
    if (!this.order) {
      // 跳回
      wx.navigateBack();

      // 未找到向导ID
      this.showErrorRoast("粗错啦QWQ没有找到你的邀请");
      return;
    }
  },
  methods: {
    handleSumitRating (event) {
      touristApi.commendOrder(
        this.order.id,
        {

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
