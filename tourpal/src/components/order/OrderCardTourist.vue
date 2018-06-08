
/* 邀请卡片，也就是一项订单，这个是为tourist准备的*/

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
      <div
      class="foot"
      v-if="order.state === 'WAITING'">
        <button
        class="d-a"
        size="mini"
        @click="handleCancel">
          撤回
        </button>
      </div>
      <div
      class="foot"
      v-if="order.state === 'FINISHED'">
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
import commonApi from '../../api/common';
import touristApi from '../../api/tourist';
import ResultMessage from '../../api/returnMessage'
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
    commonApi.querySpotById(
      this.order.spotApi,
      (res) => {
        this.spotName = res.name
      },
      (err) => {}
    )
    commonApi.queryGuideById(
      this.order.guideId,
      (res) => {
        this.guideName = res.realName
      },
      (err) => {}
    )

    // orderApi.querySpotById(
    //   this.order.spotId,
    //   (res) => {this.spotName = res.name;},
    //   (err) => {}
    // );
    // orderApi.queryGuideById(
    //   this.order.guideId,
    //   (res) => {this.guideName = res.realName;},
    //   (err) => {}
    // )
  },
  methods: {
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

