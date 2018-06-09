<template>
<div class="page">
  <div id="navigator-bar">
    <d-navigator-bar 
    :menus="menus"
    :current="current"
    @on-change="onNavigatorChange"/>
  </div>

  <div
  id="swiper-wrapper">
    <swiper
      class="swiper"
      :current="current"
      @change="handleSwiperChange">

      <swiper-item class="swiper-item">
        <!-- REJECTED -->
        <order-list-tourist :orders="ordersArray[0]"
          @scrolltolower="queryOrders"/>
        <d-loading :loading="loadingArray[0]"/>
        <d-no-more :has-more="hasMoreArray[0]"/>
        <d-no-more :has-more="ordersArray[0].length || loadingArray[0]"/>
      </swiper-item>

      <swiper-item class="swiper-item">
        <!-- CANCELED -->
        <order-list-tourist :orders="ordersArray[1]"
          @scrolltolower="queryOrders"/>
        <d-loading :loading="loadingArray[1]"/>
        <d-no-more :has-more="hasMoreArray[1]"/>
        <d-no-more :has-more="ordersArray[1].length || loadingArray[1]"/>
      </swiper-item>

      <swiper-item class="swiper-item">
        <!-- TIMEOUT -->
        <order-list-tourist :orders="ordersArray[2]"
          @scrolltolower="queryOrders"/>
        <d-loading :loading="loadingArray[2]"/>
        <d-no-more :has-more="hasMoreArray[2]"/>
        <d-no-more :has-more="ordersArray[2].length || loadingArray[2]"/>
      </swiper-item>

    </swiper>
  </div>
</div>
</template>

<script>
import touristApi from '../../api/tourist';
import orderApi from '../../api/order';

import DNavigatorBar from '../../components/common/DNavigatorBar';
import DInput from '../../components/common/DInput';
import DNoMore from '../../components/common/DNoMore';
import DLoading from '../../components/common/DLoading';
import OrderListTourist from '../../components/order/OrderList';

import { INVALID_STATE_MENU, CANCELED_STATE, INVALID_STATE_ARRAY } from '../../components/tourist/constant';
import { MOCK_TOURIST_ID } from '../../api/mock/tourist_mock_data';

export default {
  props: {
      touristId: {
          type: String,
          default:MOCK_TOURIST_ID,
          required: true
      }
  },
  components: {
    DNavigatorBar,
    OrderListTourist,
    DNoMore,
    DLoading
  },
  data () {
    return {

      menus: INVALID_STATE_MENU,
      current: CANCELED_STATE,

      hasMoreArray: [
        true, true, true
      ],
      ordersArray: [
        [], [], []
      ],
      loadingArray: [
        false, false, false
      ],

      pageName: 'invalid_tourist_order_page'
    }
  },
  mounted() {
    this.queryOrders();
  },
  methods: {
    dLog(message, ...optionalParams) {
        console.log(this.pageName, message, optionalParams);
    },
    dError(message, ...optionalParams) {
        console.error(this.pageName, message, optionalParams);
    },
    showErrorRoast(errMsg, ...fai) {
      this.dError(errMsg, fai);
    
      // 输出提示信息 
      wx.showToast({
          icon: 'none',
          title: errMsg
      });
    },
    queryOrders(...event) {
      this.dLog("queryOrders 方法响应", event);

      if (this.loading){
        this.dLog("加载中 return");
        return;
      }

      const index = this.current;

      if (!this.hasMoreArray[index]) {
        this.dLog("已经加载全部 return");
        return;
      }

      // 加载
      this.loadingArray[index] = true;

      // 保留下上次最后的index
      let lastIndex = this.ordersArray[index].length;

      touristApi.queryOrders(
        this.touristId,
        INVALID_STATE_ARRAY[index],
        lastIndex,
        (res) => {
          this.dLog("取得邀请列表成功", res);

          this.hasMoreArray[index] = res.hasMoreOrder;

          for (let key in res.orderList) {
            this.ordersArray[index].push(res.orderList[key]);
          }

          this.loadingArray[index] = false;
        },
        (rej) => {
          this.showErrorRoast("取得邀请列表失败");

          this.loadingArray[index] = false;
        }
      )
    },
    onNavigatorChange(index) {
      this.dLog(`onNavigatorChange 方法响应 index: ${index}`);
      this.current = index;
    },
    handleSwiperChange (event) {
      this.dLog("handleSwiperChange 方法响应", event);
      this.current = event.target.current;
      this.queryOrders();
    }
  }
}
</script>

<style scoped>
#swiper-wrapper {
  height: 900rpx
}
.swiper {
  height: 100%;
}
.swiper-item {
  height: 100%;
}
</style>
