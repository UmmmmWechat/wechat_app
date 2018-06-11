<template>
<div class="page">
  <div>
    <picker
      mode="selector"
      :range="menus"
      @change="handleChangeType">
      <div id="selector_div">
        <span style=" border: rgba(0,0,0,0.3) 1px solid; border-radius: 5px; padding: 2px 5px">
          <span class="title-span">类型：</span>
          {{ menus[current] }}
        </span>
      </div>
    </picker>
  </div>
  <div>
    <order-list-tourist
      :orders="ordersArray[current]"
    :loading="loadingArray[current]"
    :has-more="hasMoreArray[current]"
    @scrolltolower="queryOrders"/>
  </div>
  <!--<div id="navigator-bar">-->
    <!--<d-navigator-bar -->
    <!--:menus="menus"-->
    <!--:current="current"-->
    <!--@on-change="onNavigatorChange"/>-->
  <!--</div>-->

  <!--<div-->
  <!--id="swiper-wrapper">-->
    <!--<swiper-->
      <!--class="swiper"-->
      <!--:style="heightStyle"-->
      <!--:current="current"-->
      <!--@change="handleSwiperChange">-->

      <!--<swiper-item class="swiper-item">-->
        <!--&lt;!&ndash; REJECTED &ndash;&gt;-->
        <!--<order-list-tourist :orders="ordersArray[0]"-->
          <!--:loading="loadingArray[0]"-->
          <!--:has-more="hasMoreArray[0]"-->
          <!--@scrolltolower="queryOrders"/>-->
      <!--</swiper-item>-->

      <!--<swiper-item class="swiper-item">-->
        <!--&lt;!&ndash; CANCELED &ndash;&gt;-->
        <!--<order-list-tourist :orders="ordersArray[1]"-->
          <!--:loading="loadingArray[1]"-->
          <!--:has-more="hasMoreArray[1]"-->
          <!--@scrolltolower="queryOrders"/>-->
      <!--</swiper-item>-->

      <!--<swiper-item class="swiper-item">-->
        <!--&lt;!&ndash; TIMEOUT &ndash;&gt;-->
        <!--<order-list-tourist :orders="ordersArray[2]"-->
          <!--:loading="loadingArray[2]"-->
          <!--:has-more="hasMoreArray[2]"-->
          <!--@scrolltolower="queryOrders"/>-->
      <!--</swiper-item>-->

    <!--</swiper>-->
  <!--</div>-->
</div>
</template>

<script>
import touristApi from '../../api/tourist'

import DNavigatorBar from '../../components/common/DNavigatorBar';
import OrderListTourist from '../../components/order/OrderList';

import { INVALID_STATE_MENU, CANCELED_STATE, INVALID_STATE_ARRAY, TOURIST_ID } from '../../api/const/touristConst';
import { MOCK_TOURIST_ID } from '../../api/mock/tourist_mock_data';
import { WINDOW_HEIGHT } from '../../api/const/commonConst';

export default {
  components: {
    DNavigatorBar,
    OrderListTourist,
  },
  data () {
    return {
      scrollHeight: 400,
      touristId: MOCK_TOURIST_ID,
      menus: INVALID_STATE_MENU,
      current: 0,

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
  mounted () {
    this.touristId = wx.getStorageSync(TOURIST_ID)
    this.current = 0

    this.hasMoreArray = [
      true, true, true
    ]

    this.ordersArray = [
      [], [], []
    ]

    this.loadingArray = [
      false, false, false
    ]

    this.scrollHeight = wx.getStorageSync(WINDOW_HEIGHT)

    this.queryOrders()
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


      // 加载
      // this.loadingArray[index] = true
      this.loadingArray.splice(index, 1, true)

      // 保留下上次最后的index
      let lastIndex = this.ordersArray[index].length
      this.dLog(this.touristId)

      touristApi.queryOrders(
        this.touristId,
        INVALID_STATE_ARRAY[index],
        lastIndex,
        (res) => {
          this.dLog("取得邀请列表成功", res);

          // this.hasMoreArray[index] = res.hasMoreOrder;
          // this.loadingArray[index] = false;
          this.hasMoreArray.splice(index, 1, res.hasMoreOrder)
          this.loadingArray.splice(index, 1, false)

          for (let key in res.orderList) {
            this.ordersArray[index].push(res.orderList[key]);
          }
        },
        (rej) => {
          this.showErrorRoast("取得邀请列表失败", rej);
          // this.loadingArray[index] = false;
          this.loadingArray.splice(index, 1, false)
        }
      )
    },
    handleChangeType (event) {
      this.current = event.target.value
      this.queryOrders()
    }
  }
}
</script>

<style scoped>
.title-span {
  font-weight: bold;
  color: gray;
}
  #selector_div {
    padding: 10rpx 40rpx;
    text-align: right;
    color: #42b970;
  }
</style>
