/* 邀请卡片，也就是一项订单，这个是为guide准备的*/
/* 发射事件 on-reject(orderId) on-accept(orderId) on-cancel(orderId) */
<template>
<div class="d-card" :style="{backgroundColor: color}">
  <div class="error-wrapper" v-if="errorOccur">
    粗错啦 QWQ
  </div>
  <div v-else>
    <section @click="checkOrderDetail">
      <div class="head">
        <span>{{order.state}}</span>
      </div>

      <div id="body">
        <div>
          <span class="title-span">景点：</span>
          <span class="link">{{ spotName }}</span>
        </div>

        <div>
          <span class="title-span">游客编号：</span>
          <span class="link">{{ order.touristId }}</span>
        </div>

        <div><span class="title-span">邀请日期：</span>{{ order.generatedDate }}</div>
        
        <div><span class="title-span">旅游日期：</span>{{ order.travelDate }}</div>
      </div>
    </section>

    <div 
    id="foot"
    v-if="order.state === waiting">
      <button
      class="op-btn"
      size="mini"
      @click="handleReject">
        婉拒
      </button>
      
      <button
      class="d-a op-btn" 
      size="mini"
      @click="handleAccept">
        同意
      </button>
    </div>
  </div>
</div>
</template>

<script>
import commonApi from '../../api/common'
import guideApi from '../../api/guide'

import * as ResultMessage from '../../api/returnMessage'

import { STATES_ARRAY, WAITING_STATE, SELECTED_ORDER_INFO } from '../../api/const/guideConst';
import { GUIDE_CHECK_ORDER } from '../../pages/pages_url';

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
      componentName: 'OrderCardGuide',
      waiting: STATES_ARRAY[WAITING_STATE],

      errorOccur: false,
      touristName: '',
      spotName: ''
    }
  },
  mounted () {
    this.errorOccur = false

    // 取得景点信息
    const onGetSpotFail = (err) => {
      this.dError("取得景点信息失败", err)
      this.errorOccur = true
    }

    commonApi.querySpotById(
      this.order.spotId,
      (res) => {
        this.dLog("取得景点信息成功", res);
        this.spotName = res.name;
        this.order.spotName = this.spotName
        if (!this.spotName) {
          onGetSpotFail(res)
        }
      },
      onGetSpotFail
    );
  },
  methods: {
    dLog (message, ...optionalParams) {
      console.log(this.componentName, message, optionalParams)
    },
    dError (message, ...optionalParams) {
      console.error(this.componentName, message, optionalParams)
    },
    checkOrderDetail() {
      this.dLog("查看邀请详情")

      // 存储订单
      wx.setStorageSync(SELECTED_ORDER_INFO, this.order)

      // 跳转查看界面
      const url = `/${GUIDE_CHECK_ORDER}`;
      this.dLog('跳转', url);
      wx.navigateTo({ url });
    },
    handleReject(event) {
      this.dLog("handleReject 方法调用", event)

      wx.showModal({
        title: '确定要拒绝这个邀请么？',
        success: (res) => {
          if (res.confirm) {
            this.dLog("确认拒绝", res)
            // api
            guideApi.rejectOrder(
              this.order.id,
              (res) => {
                wx.showToast({
                  title: '邀请拒绝成功',
                  icon: 'none'
                })
                this.$emit('on-reject', this.order.id)
              },
              (err) => {
                let title = ''
                if (err === ResultMessage.ALREADY_CANCELED) {
                  title = '邀请已经被撤回'
                  this.$emit('on-cancel', this.order.id)
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
    handleAccept(event) {
      this.dLog("handleAccept 方法调用", event)

      wx.showModal({
        title: '确定要接受这个邀请么？',
        success: (res) => {
          if (res.confirm) {
            this.dLog("确认接受", res)
            // api
            guideApi.acceptOrder(
              this.order.id,
              (res) => {
                wx.showToast({
                  title: '接受成功 请耐心等待',
                  icon: 'none'
                })
                this.$emit('on-accept', this.order.id)
              },
              (err) => {
                let title = ''
                if (err === ResultMessage.ALREADY_CANCELED) {
                  title = '邀请已经被撤回'
                  this.$emit('on-cancel', this.order.id)
                } else {
                  title = '接受失败，请重试'
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
    }
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
