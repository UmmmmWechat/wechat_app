<template>
<div>
  <div id="search-wrapper" class="d-head">
    <icon type="search" size="10" color="white"/>
    <div style="display:inline-block;width:90%;">
      <d-input
      placeholder="搜索邀请"
      confirm-type="search"
      :value="searchValue"
      @input="handleSearchInput"
      @on-focus="handleSearchFocus"
      @on-enter="handleResetSearch"/>
    </div>     
  </div>

  <div
    v-if="isSearch" 
    class="d-search-list">
    <div 
    style="text-align:center;padding:10rpx;">
      <button 
      class="d-back-btn-white"
      size="mini"
      plain
      @click="handleClickBack">
        返回
      </button>
      <button 
      class="d-back-btn-white"
      style="margin-left:33rpx;"
      size="mini"
      plain
      @click="handleClearSearch">
        清空
      </button>
    </div>
    <order-list-tourist
    :orders="searchOrders"/>
    <d-loading :loading="loading" color="white" />
  </div>

  <div v-if="!isSearch">
    <div id="navigator-bar">
      <d-navigator-bar 
      :menus="menus"
      :current="current"
      @on-change="current = $event.target.value"
      />
    </div>

    <div
    id="swiper-wrapper">
      <swiper
      class="swiper"
      :current="current"
      @change="handleSwiperChange">
        <swiper-item class="swiper-item">
          <order-list-tourist :orders="waitingOrders"/>
          <d-loading :loading="loading"/>
        </swiper-item>

        <swiper-item class="swiper-item">
          <order-list-tourist :orders="ongoingOrders"/>
          <d-loading :loading="loading" />
        </swiper-item>

        <swiper-item class="swiper-item">
          <order-list-tourist :orders="invalidOrders"/>
          <d-loading :loading="loading" />
        </swiper-item>

        <swiper-item class="swiper-item">
          <order-list-tourist :orders="finishedOrders"/>
          <d-loading :loading="loading" />
        </swiper-item>
      </swiper>
    </div>
  </div>
</div>
</template>

<script>
import touristApi from '../../api/tourist';
import orderApi from '../../api/order';

import DNavigatorBar from '../../components/common/DNavigatorBar';
import DInput from '../../components/common/DInput';
import DLoading from '../../components/common/DLoading';
import OrderListTourist from '../../components/order/OrderList';
import { STATE_MENU, STATES_ARRAY, TOURIST_ID } from '../../components/tourist/constant';
import { MOCK_TOURIST_ID } from '../../api/mock/tourist_mock_data';

export default {
  components: {
    DNavigatorBar,
    OrderListTourist,
    DInput,
    DLoading
  },
  data () {
    return {
      touristId: MOCK_TOURIST_ID,

      loading: false,
      
      searchHasMore: true,
      isSearch: false,
      searchWord: '',
      searchValue: undefined, // 用于清空搜索框
      searchOrders: [],

      menus: STATE_MENU,
      current: 0,

      waitingHasMore: true,
      waitingOrders: [],
      ongoingOrders: [],
      finishedOrders: [],
      invalidOrders: [],

      scrollTop: undefined,
      searchScrollTop: undefined,
      show_gotop: false,

      pageName: 'tourist_orders'
    }
  },
  mounted() {
    this.touristId = wx.getStorageSync(TOURIST_ID);
    if (!this.touristId) {
      // 未找到游客ID 需要先去登录
      const errMsg = "未找到游客ID 需要先去登录";
      this.dError(errMsg);
      
      // 输出提示信息 
      wx.showToast({
        icon: 'none',
        title: errMsg
      });

      const url = `/${ROLE_SELECT}`;
      this.dLog('跳转', url);
      wx.redirectTo({ url });

      return;
    }
    
    this.queryWaitingOrders();// TODO
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
    queryWaitingOrders() {

    },
    handleSwiperChange (event) {
      console.log(event);
      this.loading = true;
      let current = event.target.current;
      this.current = current;
      var states = STATES_ARRAY;
      touristApi.queryOrders(
        'touristId',
        states[current],
        'lastIndex',
        (res) => {
          switch (current) {
            case 0: this.waitingOrders = res; break;
            case 1: this.ongoingOrders = res; break;
            case 3: this.finishedOrders = res; break;
            case 2: this.invalidOrders = res; break;
          }
          this.loading = false;
        },
        (err) => {}
      )
    },
    handleSearchFocus (event) {
      this.dLog("handleSearchFocus 方法调用", event);
      this.isSearch = true;
      this.show_gotop = false;
    },
    handleSearchInput(e) {
      this.dLog("handleInput 方法调用", e);
      this.searchWord = e;
      this.dLog(`message 更新 ${this.message}`);
    },
    searchScrollToTop() {
      this.dLog("searchScrollToTop 方法调用");

      this.show_gotop = false;

      this.searchScrollTop = 0;
      setTimeout(
        () => {
          this.searchScrollTop = undefined;
        }, 500);

      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    },
    handleResetSearch(event) {
      this.dLog("handleResetSearch 方法调用", event);

      this.searchHasMore = true;
      this.searchOrders.splice(0, this.searchOrders.length);// 清空搜索的 spot 数组

      // 重新搜索

      // 加载
      this.loading = true;

      // 按照关键词搜索邀请
      spotApi.queryOrdersByKeywordAndCity(
        this.touristId,
        this.searchWord,
        0,
        (res) => {
          this.dLog("搜索邀请列表成功", res);

          this.searchHasMore = res.hasMoreOrder;

          for (let key in res.orderList) {
            this.searchOrders.push(res.orderList[key]);
          }
        },
        (fai) => {
            const errMsg = "搜索邀请列表失败";
            this.dError(errMsg, fai);
            
            // 输出提示信息 
            wx.showToast({
              icon: 'none',
              title: errMsg
            });
        }
      );

      // 上滑到顶部
      this.searchScrollToTop();
    },
    handleScrollToSearch(event) {
      this.dLog("handleScrollToSearch 方法调用", event);

      if (this.loading){
        this.dLog("加载中 return");
        return;
      }
      if (!this.searchHasMore) {
        this.dLog("已经加载全部 return")
        return;
      }

      // 加载
      this.loading = true;

      // 保留下上次最后的index
      let lastIndex = this.searchOrders.length;

      // 按照关键词搜索邀请
      spotApi.queryOrdersByKeywordAndCity(
        this.searchWord,
        this.location,
        lastIndex,
        (res) => {
          this.dLog("搜索邀请列表成功", res);

          this.searchHasMore = res.hasMoreSpot;

          for (let key in res.spotList) {
            this.searchOrders.push(res.spotList[key]);
          }
          
          this.loading = false;
        },
        (fai) => {
            const errMsg = "搜索邀请列表失败";
            this.dError(errMsg, fai);
            
            // 输出提示信息 
            wx.showToast({
              icon: 'none',
              title: errMsg
            });
        }
      );
    },
    handleClickBack(event) {
      this.dLog("handleClickBack 方法调用", event);
      
      // 清空
      this.handleClearSearch(event);

      this.isSearch = false;
    },
    handleClearSearch(event) {
      this.dLog("handleClickBack 方法调用", event);
      
      // 清空搜索框
      this.searchValue = "";
      setTimeout(
        () => {
          this.searchValue = undefined;
        }, 500
      );

      // 重置属性
      this.searchWord = "";
      this.searchHasMore = true;
      this.searchOrders.splice(0, this.searchOrders.length);// 清空搜索的 spot 数组

      // 回滚
      this.searchScrollToTop();
    }
  }
}
</script>

<style scoped>
/* .swiper-item {
  height: 1000rpx;
} */

.swiper {
  height: 1200rpx;
  padding: 40rpx 0;
}

</style>

<style scoped src="../../assets/style/d-head.css"/>
<style scoped src="../../assets/style/d-search-list.css"/>
<style scoped src="../../assets/style/d-btn.css"/>
