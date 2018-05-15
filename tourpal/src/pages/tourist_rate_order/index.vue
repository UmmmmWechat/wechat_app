<template>
  <div id="out">
    <div id="rate-spot" class="rate-item">
      <spot-card 
      :spot="spot" 
      :noAction="true"/>
      <div class="form-item">
        <span class="label">给景点评分</span>
        <slider :min="1" :max="5" show-value @change="rateSpot = $event.target.value;"/>
      </div>
    </div>
    <div id="rate-guide" class="rate-item">
      <guide-card 
      :guide="guide"
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
export default {
  components: {
    SpotCard,
    GuideCard,
    DTextarea
  },
  data () {
    return {
      spot: {},
      guide: {},
      order: {},
      rateSpot: 1,
      rateGuide: 1
    }
  },
  mounted () {
    wx.getStorage({
      key: 'order',
      success: (order) => {
        this.order = order;
        touristApi.querySpotById(
          order.spotId,
          (spot) => this.spot = spot,
          (err) => {}
        );
        touristApi.queryGuideById(
          order.guideId,
          (guide) => this.guide = guide,
          (err) => {}
        );
      }
    })
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
