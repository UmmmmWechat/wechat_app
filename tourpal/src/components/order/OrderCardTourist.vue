<template>
  <div class="d-card">
      <div id="head">
        <span>{{order.state}}</span>
      </div>
      <div id="body">
        <div><span class="title-span">景点：</span><span class="link">{{ spotName }}</span></div>
        <div><span class="title-span">向导：</span><span class="link">{{ guideName }}</span></div>
        <div><span class="title-span">邀请日期：</span>{{ order.generatedDate }}</div>
        <div><span class="title-span">旅游日期：</span>{{ order.travelDate }}</div>
      </div>
  </div>
</template>

<script>
import orderApi from '../../api/order'
export default {
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      spotName: '',
      guideName: '',
    }
  },
  mounted () {
    orderApi.querySpotById(
      this.order.spotId,
      (res) => {this.spotName = res.name;},
      (err) => {}
    );
    orderApi.queryGuideById(
      this.order.guideId,
      (res) => {this.guideName = res.realName;},
      (err) => {}
    )
  }
}
</script>

<style scoped>
#head {
  padding-right: 20rpx;
  padding-top: 10rpx;
  text-align: right;
  color: #42b970;
}
#body {
  padding: 0 20rpx 20rpx 20rpx;
  color: black;
  color: gray;
}
.title-span {
  font-weight: bold;
}
.link {
  text-decoration: underline;
}
</style>
<style scoped src="../../assets/style/d-card.css"/>

