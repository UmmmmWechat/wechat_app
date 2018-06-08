
/* 邀请卡片，也就是一项订单，这个是为tourist准备的*/
<template>
  <div class="d-card" :style="{backgroundColor: color}">
      <div id="head">
        <span>{{order.state}}</span>
      </div>

      <div id="body">
        <div>
          <span class="title-span">景点：</span>
          <span class="link" @click="onSpotNameClicled">{{ spotName }}</span>
        </div>

        <div>
          <span class="title-span">向导：</span>
          <span class="link" @click="onGuideNameClicled">{{ guideName }}</span>
        </div>

        <div><span class="title-span">邀请日期：</span>{{ order.generatedDate }}</div>
        
        <div><span class="title-span">旅游日期：</span>{{ order.travelDate }}</div>
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
      v-if="order.state === finished">
        <button 
        class="d-a" 
        size="mini"
        @click="handleRate">
          评价
        </button>
      </div>
  </div>
</template>

<script>
import orderApi from '../../api/order'
import { STATES_ARRAY, WAITING_STATE, FINISHED_STATE } from '../tourist/constant';
import { SHOW_SPOT_PAGE, SHOW_GUIDE_PAGE } from '../../pages/pages_url';
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
      spotName: '',
      guideName: '',
      componentName: 'OrderCardTourist',
      waiting: STATES_ARRAY[WAITING_STATE],
      finished: STATES_ARRAY[FINISHED_STATE]
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
  },
  methods: {
    dLog(message, ...optionalParams) {
        console.log(this.componentName, message, optionalParams);
    },
    onSpotNameClicled(event) {
      const url = `/${SHOW_SPOT_PAGE}`;
      this.dLog('跳转', url);
      wx.navigateTo({ url });
    },
    onGuideNameClicled(event) {
      const url = `/${SHOW_GUIDE_PAGE}`;
      this.dLog('跳转', url);
      wx.navigateTo({ url });
    },
    handleCancel (event) {
      wx.showModal({
        title: '你确定要撤回这个邀请么？',
        success: (res) => {
          console.log(res);
          if(res.confirm) {
            // api
          }
        }
      })
    },
    handleRate (event) {
      wx.setStorage({
        key: 'order',
        data: this.order,
        success: () => {
          wx.navigateTo({
            url: '/pages/tourist_rate_order/main'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
#head {
  padding-right: 20rpx;
  padding-top: 10rpx;
  text-align: right;
}
#body {
  padding: 0 20rpx 20rpx 20rpx;
  color: black;
  color: gray;
}

.foot {
  text-align:right;
  padding: 0 20rpx 20rpx 0;
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

