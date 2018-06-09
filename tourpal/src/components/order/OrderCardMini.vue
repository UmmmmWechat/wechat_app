
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
import * as urlList from '../../pages/pages_url'

import orderApi from '../../api/order'
import commonApi from '../../api/common'
import { SELECTED_ORDER_INFO } from '../../api/const/guideConst';

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
    commonApi.querySpotById(
      this.order.spotId,
      (res) => {this.spotName = res.name;},
      (err) => {}
    );
    this.touristName = this.order.touristId
  },
  methods: {
    checkOrderDetail() {
      wx.setStorage({
        key: SELECTED_ORDER_INFO,
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

