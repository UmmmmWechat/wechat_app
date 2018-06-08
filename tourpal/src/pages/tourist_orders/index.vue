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
      :color="'white'"
      :orders="searchOrders"
      @scrolltolower="handleScrollToSearch"/>

    <d-loading :loading="loading" :color="'white'" />

    <d-no-more :has-more="searchHasMore" :color="'white'"/>
  </div>

  <div v-if="!isSearch">
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
          <!-- WAITING -->
          <order-list-tourist :orders="ordersArray[0]"
            @scrolltolower="queryOrders"/>
          <d-loading :loading="loadingArray[0]"/>
          <d-no-more :has-more="hasMoreArray[0]"/>
        </swiper-item>

        <swiper-item class="swiper-item">
          <!-- ONGOING -->
          <order-list-tourist :orders="ordersArray[1]"
            @scrolltolower="queryOrders"/>
          <d-loading :loading="loadingArray[1]"/>
          <d-no-more :has-more="hasMoreArray[1]"/>
        </swiper-item>

        <swiper-item class="swiper-item">
          <!-- FINISHED -->
          <order-list-tourist :orders="ordersArray[2]"
            @scrolltolower="queryOrders"/>
          <d-loading :loading="loadingArray[2]"/>
          <d-no-more :has-more="hasMoreArray[2]"/>
        </swiper-item>

        <swiper-item class="swiper-item">
          <!-- INVALID -->
          <invalid-tourist-order-page/>
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
import DNoMore from '../../components/common/DNoMore';
import DLoading from '../../components/common/DLoading';
import OrderListTourist from '../../components/order/OrderList';
import InvalidTouristOrderPage from '../../components/tourist/InvalidTouristOrderPage';

import { STATE_MENU, STATES_ARRAY, TOURIST_ID, WAITING_STATE, INVALID_STATE } from '../../components/tourist/constant';
import { MOCK_TOURIST_ID } from '../../api/mock/tourist_mock_data';
import { ROLE_SELECT } from '../pages_url';

export default {
  components: {
    DNavigatorBar,
    OrderListTourist,
    DInput,
    DNoMore,
    DLoading,
    InvalidTouristOrderPage
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
      current: WAITING_STATE,

      hasMoreArray: [
        true, true, true, true
      ],
      ordersArray: [
        [], [], [], []
      ],
      loadingArray: [
        false, false, false, false
      ],

      pageName: 'tourist_orders'
    }
  },
  mounted() {
    this.touristId = wx.getStorageSync(TOURIST_ID);
    if (!this.touristId) {
      // 未找到游客ID 需要先去登录
      const url = `/${ROLE_SELECT}`;
      this.dLog('跳转', url);
      wx.redirectTo({ url });
      
      this.showErrorRoast("未找到游客ID 需要先去登录");

      return;
    }
    
    this.queryOrders();// TODO
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

      if (index == INVALID_STATE) {
        this.dLog("invalid!");
        return;
      }

      // 加载
      this.loadingArray[index] = true;

      // 保留下上次最后的index
      let lastIndex = this.ordersArray[index].length;

      touristApi.queryOrders(
        this.touristId,
        STATES_ARRAY[index],
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
    },
    handleSearchFocus (event) {
      this.dLog("handleSearchFocus 方法调用", event);
      this.isSearch = true;
    },
    handleSearchInput(e) {
      this.dLog("handleInput 方法调用", e);
      this.searchWord = e;
      this.dLog(`message 更新 ${this.message}`);
    },
    handleResetSearch(event) {
      this.dLog("handleResetSearch 方法调用", event);

      this.searchHasMore = true;
      this.searchOrders.splice(0, this.searchOrders.length);// 清空搜索的 spot 数组

      // 重新搜索

      // 按照关键词搜索邀请
      this.searchOrderByKeyword(0);
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

      // 按照关键词搜索邀请
      this.searchOrderByKeyword(this.searchOrders.length);
    },
    searchOrderByKeyword(lastIndex) {
      // 加载
      this.loading = true;

      touristApi.queryOrdersByKeyword(
        this.touristId,
        this.searchWord,
        lastIndex,
        (res) => {
          this.dLog("搜索邀请列表成功", res);

          this.searchHasMore = res.hasMoreOrder;

          for (let key in res.orderList) {
            this.searchOrders.push(res.orderList[key]);
          }

          this.loading = false;
        },
        (fai) => {
          this.showErrorRoast("搜索邀请列表失败");

          this.loading = false;
        }
      )
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
    }
  }
}
</script>

<style scoped>
.swiper {
  height: 1000rpx;
  padding: 40rpx 0;
}
.swiper-item {
  height: 100%;
}
</style>

<style scoped src="../../assets/style/d-head.css"/>
<style scoped src="../../assets/style/d-search-list.css"/>
<style scoped src="../../assets/style/d-btn.css"/>
