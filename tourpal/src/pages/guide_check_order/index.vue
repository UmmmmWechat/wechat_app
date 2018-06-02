<template>
<section id="page">

  <section id="isLoading" v-if="!order">
    {{ prompt }}
  </section>

  <section v-else>

    <section id="info-section">
      <section class="info-item">
        <span class="title-span">邀请编号：</span>
        <span class="link">{{ order.id }}</span>
      </section>
      <section class="info-item">
        <span class="title-span">邀请状态：</span>
        <span class="link">{{ order.state }}</span>
      </section>
      <section class="info-item">
        <span class="title-span">游客姓名：</span>
        <span class="link" v-if="touristName">{{ touristName }}</span>
        <span class="link" v-else>{{ prompt }}</span>
      </section>
      <section class="info-item">
        <span class="title-span">景点名称：</span>
        <span class="link" v-if="spotName">{{ spotName }}</span>
        <span class="link" v-else>{{ prompt }}</span>
      </section>
      <section class="info-item">
        <span class="title-span">提交日期：</span>
        <span class="link">{{ order.generatedDate }}</span>
      </section>
      <section class="info-item">
        <span class="title-span">旅行日期：</span>
        <span class="link">{{ order.travelDate }}</span>
      </section>
      <section class="info-item">
        <span class="title-span">邀请留言：</span>
        <span class="link">{{ order.message }}</span>
      </section>
    </section>
    
    <footer v-if="order.state === 'waiting'">

      <button class="op-btn">
        婉拒
      </button>

      <button class="d-a op-btn">
        同意
      </button>

    </footer>

  </section>
</section>
</template>

<script>
import orderApi from '../../api/order'
import * as constant from './constant'

export default {
  data() {
    return {
      prompt: 'Loading...',
      order: null,
      touristName: null,
      spotName: null,
    }
  },
  mounted() {
    this.prompt = 'Loading...',
    this.getOrder();
  },
  methods: {
    getOrder() {
      var that = this;
      this.order = this.mockOrder;
      wx.getStorage({
        key: constant.SELECTED_ORDER_KEY,
        success: function(res) {
          that.order = res.data;
          that.setOrderInfo();
          console.log(res);
        },
        fail: function(res) {
          that.prompt = res.errMsg;
          console.log(res);
        }
      });
    },
    setOrderInfo() {
      orderApi.querySpotById(
        this.order.spotId,
        (res) => {this.spotName = res.name;},
        (err) => {}
      );
      orderApi.queryTouristById(
        this.order.touristId,
        (res) => {this.touristName = res.name;},
        (err) => {}
      );
    },
    createDate() {
      return new Date().toLocaleDateString()
    }
  }
}
</script>

<style scoped>

#page {
  padding-top: 2em;
  padding-bottom: 5em;
}

#info-section {
  /* padding-left: 2em; */
  border-radius: 20px;
  border: solid #42b9704d;
  margin: 0 20rpx 0 20rpx;
  padding: 20rpx 0 20rpx 0;
  box-shadow: #42b9704d 0 0 5px;
}

.info-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    
    padding: 10rpx;
}

.title-span {
  font-weight: bold;
  width: 190rpx;
}

.link {
  text-decoration: underline;
  width: 460rpx;
}

footer {
  text-align:right;
  padding: 0 20rpx 20rpx 20rpx;
  margin-top: 1em;
}

.op-btn {
  width: 200rpx;
  margin-left: 30rpx;
  display: inline-block;
  background-color: transparent;
  border-collapse: rgba(0, 0, 0, 0.7);
}

</style>
<style scoped src="../../assets/style/d-a.css"/>
