
/* mini 邀请卡片 用于日历页显示 */

<template>
  <div class="d-card">
      <div id="body" @click="checkOrderDetail">
        <div><span class="title-span">景点：</span><span class="link">{{ spotName }}</span></div>
        <div><span class="title-span">游客：</span><span class="link">{{ touristName }}</span></div>
      </div>
  </div>
</template>

<script>
import * as constant from '../../pages/guide_check_order/constant'
import * as urlList from '../../pages/pages_url'

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
      this.order.touristId,
      (res) => {this.touristName = res.name;},
      (err) => {}
    )
  },
  methods: {
    checkOrderDetail() {
      wx.setStorage({
        key: constant.SELECTED_ORDER_KEY,
        data: this.order,
        success: function(res) {
          console.log(res);
          wx.navigateTo({
            url: "/" + urlList.GUIDE_CHECK_ORDER
          })
        },
        fail: function(res) {
          console.log(res);
        }
      })
    }
  }
}
</script>

<style scoped>

#body {
  padding: 20rpx 20rpx 20rpx 20rpx;
  /* color: black; */
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
<style scoped src="../../assets/style/d-a.css"/>

