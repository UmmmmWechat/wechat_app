
/* 邀请卡片，也就是一项订单，这个是为guide准备的*/

<template>
  <div class="d-card">
      <div class="head">
        <span>{{order.state}}</span>
      </div>
      <div id="body">
        <div><span class="title-span">景点：</span><span class="link">{{ spotName }}</span></div>
        <div><span class="title-span">游客：</span><span class="link">{{ touristName }}</span></div>
        <div><span class="title-span">邀请日期：</span>{{ order.generatedDate }}</div>
        <div><span class="title-span">旅游日期：</span>{{ order.travelDate }}</div>
      </div>
      <div 
      id="foot"
      v-if="order.state === 'waiting'">
        <button class="op-btn"
        size="mini">
          婉拒
        </button>
        <button class="d-a op-btn" size="mini">
          同意
        </button>
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
      touristName: '',
    }
  },
  mounted () {
    orderApi.querySpotById(
      this.order.spotId,
      (res) => {this.spotName = res.name;},
      (err) => {}
    );
    orderApi.queryTouristById(
      this.order.guideId,
      (res) => {this.touristName = res.name;},
      (err) => {}
    )
  }
}
</script>

<style scoped>
.head {
  padding-right: 20rpx;
  padding-top: 10rpx;
  float: right;
}
#body {
  padding: 20rpx 20rpx 20rpx 20rpx;
  /* color: black; */
  color: gray;
}

#foot {
  text-align:right;
  padding: 0 20rpx 20rpx 0;
}
.title-span {
  font-weight: bold;
}
.link {
  text-decoration: underline;
}

.op-btn {
    margin-left: 30rpx;
    display: inline-block;
    background-color: transparent;
}

</style>
<style scoped src="../../assets/style/d-card.css"/>
<style scoped src="../../assets/style/d-a.css"/>

