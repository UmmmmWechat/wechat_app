/* 邀请卡片，也就是一项订单，这个是为tourist准备的*/
<template>
<div class="d-card" :style="{backgroundColor: color}">
  <div class="error-wrapper" v-if="errorOccur">
    粗错啦 QWQ
  </div>
  <div v-else>
    <div id="head">
      <span>{{order.state}}</span>
    </div>

    <div id="body">
      <div>
        <span class="title-span">景点：</span>
        <span class="link" @click="onSpotNameClicled">{{ spot.name }}</span>
      </div>

      <div>
        <span class="title-span">向导：</span>
        <span class="link" @click="onGuideNameClicled">{{ guide.realName }}</span>
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
</div>
</template>

<script>
import commonApi from '../../api/common';
import touristApi from '../../api/tourist';
import * as ResultMessage from '../../api/returnMessage'
import orderApi from '../../api/order'
import { STATES_ARRAY, WAITING_STATE, FINISHED_STATE, CHECK_GUIDE_ID, CHECK_SPOT_ID } from '../tourist/constant';
import { SHOW_SPOT_PAGE, SHOW_GUIDE_PAGE } from '../../pages/pages_url';
import { mockSpot } from '../../api/mock/spot_mock_data';
import { mockGuide } from '../../api/mock/guide_mock_data';

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
      spot: mockSpot,
      guide: mockGuide,
      componentName: 'OrderCardTourist',
      waiting: STATES_ARRAY[WAITING_STATE],
      finished: STATES_ARRAY[FINISHED_STATE],

      errorOccur: false
    }
  },
  mounted () {
    this.errorOccur = false;

    commonApi.querySpotById(
      this.order.spotId,
      (res) => {
        this.spot = res;
        if (!this.spot) {
          this.dError("取得spot失败", res);
        }
      },
      (err) => {
          this.dError("取得spot失败", err);
      }
    )
    commonApi.queryGuideById(
      this.order.guideId,
      (res) => {
        this.guide = res;
        if (!this.guide) {
          this.dError("取得guide失败", res);
        }
      },
      (err) => {
          this.dError("取得guide失败", err);
      }
    )
  },
  methods: {
    dLog(message, ...optionalParams) {
        console.log(this.componentName, message, optionalParams);
    },
    dError(message, ...optionalParams) {
        this.errorOccur = true;
        console.error(this.componentName, message, optionalParams);
    },
    onSpotNameClicled(event) {
      this.dLog("onSpotNameClicled 方法响应", event);
      wx.setStorage({
        key: CHECK_SPOT_ID,
        data: this.order.spotId,
        success: (suc) => {
          this.dLog("guide 保存成功", suc);
          const url = `/${SHOW_SPOT_PAGE}`;
          this.dLog('跳转', url);
          wx.navigateTo({ url });
        }
      });
    },
    onGuideNameClicled(event) {
      this.dLog("onGuideNameClicled 方法响应", event);
      wx.setStorage({
        key: CHECK_GUIDE_ID,
        data: this.order.guideId,
        success: (suc) => {
          this.dLog("guide 保存成功", suc);
          const url = `/${SHOW_GUIDE_PAGE}`;
          this.dLog('跳转', url);
          wx.navigateTo({ url });
        }
      });
    },
    handleCancel (event) {
      wx.showModal({
        title: '你确定要撤回这个邀请么？',
        success: (res) => {
          console.log(res)
          if (res.confirm) {
            // api
            touristApi.cancelOrders(
              this.order.id,
              (res) => {
                this.$emit('on-cancel', this.order.id)
              },
              (err) => {
                let title = ''
                if (err === ResultMessage.ALREADY_ACCEPTED) {
                  title = '订单已经被接受，不能撤回'
                } else if (err === ResultMessage.ALREADY_REJECTED){
                  title = '订单已经被回拒'
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
.error-wrapper{
  text-align: center;
  padding: 20rpx;
}

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

