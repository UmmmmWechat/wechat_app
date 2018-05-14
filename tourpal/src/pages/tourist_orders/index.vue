<template>
  <div>
    <div id="search-wrapper" class="d-head">
        <icon type="search" size="10" color="white"/>
        <div style="display:inline-block;width:90%;">
          <d-input
          v-model="searchWord"
          placeholder="搜索邀请"
          confirm-type="search"
          @on-focus="handleSearchFocus"
          @on-enter="handleSearch"/>
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
          <order-list-tourist :orders="finishedOrders"/>
          <d-loading :loading="loading"/>
        </swiper-item>
        <swiper-item class="swiper-item">
          <order-list-tourist :orders="invalidOrders"/>
          <d-loading :loading="loading" />
        </swiper-item>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import touristApi from '../../api/tourist'

import DNavigatorBar from '../../components/common/DNavigatorBar';
import DInput from '../../components/common/DInput';
import DLoading from '../../components/common/DLoading';
import OrderListTourist from '../../components/order/OrderList';

export default {
  components: {
    DNavigatorBar,
    OrderListTourist,
    DInput,
    DLoading
  },
  data () {
    return {
      isSearch: false,
      searchWord: '',
      loading: false,
      menus: ['等待中','进行中','已完成','失效'],
      current: 0,
      waitingOrders: [],
      ongoingOrders: [],
      finishedOrders: [],
      invalidOrders: [],
      searchOrders: []
    }
  },
  mounted() {
    this.loading = true;
    touristApi.queryOrders(
      'touristId',
      'waiting',
      -1,
      (res) => {
        this.waitingOrders = res;
        this.loading = false;
      },
      (err) => {}
    )
  },
  methods: {
    handleSwiperChange (event) {
      console.log(event);
      this.loading = true;
      let current = event.target.current;
      this.current = current;
      var states = ['waiting', 'ongoing', 'finished', 'invalid'];
      touristApi.queryOrders(
        'touristId',
        states[current],
        'lastIndex',
        (res) => {
          switch (current) {
            case 0: this.waitingOrders = res; break;
            case 1: this.ongoingOrders = res; break;
            case 2: this.finishedOrders = res; break;
            case 3: this.invalidOrders = res; break;
          }
          this.loading = false;
        },
        (err) => {}
      )
    },
    handleSearchFocus (event) {
      this.isSearch = true;
    },
    handleSearch (event) {
      this.loading = true;
    },
    handleClickBack (event) {
      this.isSearch = false;
      this.searchOrders = [];
      this.searchWord = '';
      this.loading = false;
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
