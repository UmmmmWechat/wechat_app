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
      :style="heightStyle"
      :current="current"
      @change="handleSwiperChange">

      <swiper-item class="swiper-item">
        <!-- REJECTED -->
        <order-list-tourist :orders="ordersArray[0]"
          :loading="loadingArray[0]"
          :has-more="hasMoreArray[0]"
          @scrolltolower="queryOrders"/>
      </swiper-item>

      <swiper-item class="swiper-item">
        <!-- CANCELED -->
        <order-list-tourist :orders="ordersArray[1]"
          :loading="loadingArray[1]"
          :has-more="hasMoreArray[1]"
          @scrolltolower="queryOrders"/>
      </swiper-item>

      <swiper-item class="swiper-item">
        <!-- TIMEOUT -->
        <order-list-tourist :orders="ordersArray[2]"
          :loading="loadingArray[2]"
          :has-more="hasMoreArray[2]"
          @scrolltolower="queryOrders"/>
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

import { INVALID_STATE_MENU, CANCELED_STATE, INVALID_STATE_ARRAY, TOURIST_ID } from '../../api/const/touristConst';
import { MOCK_TOURIST_ID } from '../../api/mock/tourist_mock_data';
import { WINDOW_HEIGHT } from '../../api/const/commonConst';

export default {
  components: {
    DNavigatorBar,
    OrderListTourist,
    DNoMore,
    DLoading
  },
  data () {
    return {
      scrollHeight: 400,
      touristId: MOCK_TOURIST_ID,
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
  computed: {
    heightStyle () {
      return `height: ${this.scrollHeight - 50}px`
    }
  },
  mounted() {
    this.touristId = wx.getStorageSync(TOURIST_ID);
    this.current = CANCELED_STATE

    this.hasMoreArray = [
      true, true, true
    ]

    this.ordersArray = [
      [], [], []
    ]

    this.loadingArray=  [
      false, false, false
    ]

    this.queryOrders();

    this.scrollHeight = wx.getStorageSync(WINDOW_HEIGHT)
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

      

      const index = this.current;

      if (this.loadingArray[index]){
        this.dLog("加载中 return");
        return;
      }

      if (!this.hasMoreArray[index]) {
        this.dLog("没有了 return");
        return
      }


      // 加载
      this.loadingArray[index] = true;

      // 保留下上次最后的index
      let lastIndex = this.ordersArray[index].length;
      this.dLog(this.touristId)

      touristApi.queryOrders(
        this.touristId,
        INVALID_STATE_ARRAY[index],
        lastIndex,
        (res) => {
          this.dLog("取得邀请列表成功", res);

          this.hasMoreArray[index] = res.hasMoreOrder;
          this.loadingArray[index] = false;

          for (let key in res.orderList) {
            this.ordersArray[index].push(res.orderList[key]);
          }

          
        },
        (rej) => {
          this.showErrorRoast("取得邀请列表失败");
          this.loadingArray[index] = false;
        }
      )
    },
    onNavigatorChange (index) {
      this.current = index
      if (!this.ordersArray[index].length) {
        this.queryOrders()
      }
      this.dLog(`onNavigatorChange 方法响应 index: ${index}`)
    },
    handleSwiperChange (event) {
      this.current = event.target.current
      if (!this.ordersArray[this.current].length) {
        this.queryOrders()
      }
      this.dLog('handleSwiperChange 方法响应', event)
    }
  }
}
</script>

<style scoped>
#swiper-wrapper {
  /* height: 100%; */
}
.swiper {
  /* height: 100%; */
}
.swiper-item {
  height: 100%;
}
</style>
