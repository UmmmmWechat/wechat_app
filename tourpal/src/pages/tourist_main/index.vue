<template>
<div>
  <div id="head" class="d-head">
    <div id="user-info-div">
      <span>欢迎：</span>
      <span class="underline-span">
        <!-- <open-data type="userNickName"></open-data> -->
        <!-- id="user-info-btn" -->
        <button 
        class="d-back-btn-white"
        size="mini" 
        open-type="getUserInfo" 
        @getuserinfo="handleGetUserInfo"
        @click="handleToPersonCenter">{{touristName}}</button>
      </span>
    </div>
    <div>
      <span>旅游地点：</span>
      <div style="display:inline-block;">
      <picker 
      mode="region"
      @change="handleLocationChange"
      >
        <span
        class="underline-span" >
        {{ city }}
        </span>
      </picker>
      </div>
      
    </div>
    <div id="search">
      <icon type="search" size="10" color="white"/>
      <div style="display:inline-block;width:90%;">
        <d-input
        v-model="searchWord"
        placeholder="搜索景点"
        confirm-type="search"
        @on-focus="handleSearchFocus"
        @on-enter="handleSearch"/>
      </div>     
    </div>
  </div>

  <scroll-view
  v-if="!isSearch"
  class="scroll" 
  scroll-y
  scroll-with-animation
  enable-back-to-top
  :scroll-top="scrollTop"
  @scroll="handleScroll"
  @scrolltolower="handleGetMoreSpots">
    <div id="body">
    <spot-card
    v-for="spot in toShowSpots"
    :key="spot.id"
    :spot="spot"
    />
    </div>
    <d-loading :loading="loading"/>
    <d-no-more :has-more="hasMore" />
  </scroll-view>

  <scroll-view
  v-else 
  class="scroll d-search-list"
  scroll-y
  scroll-with-animation
  enable-back-to-top
  :scroll-top="searchScrollTop"
  @scroll="handleScroll"
  @scrolltolower="handleSearch">
    <div >
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
    <spot-card
    v-for="spot in toShowSpots"
    :key="spot.id"
    :spot="spot"/>
    </div>
    <d-loading :loading="loading" :color="white"/>
    <d-no-more :has-more="hasMore" :color="white"/>
  </scroll-view>
</div>
</template>


<script>
import SpotCard from '../../components/spot/SpotCard';
import DInput from '../../components/common/DInput';
import DLoading from '../../components/common/DLoading';
import DNoMore from '../../components/common/DNoMore';

import touristApi from '../../api/tourist';
import spotApi from '../../api/spot';

import { TOURIST_ID } from '../../components/tourist/constant';

const SHOW_TOP_SCROLLTOP = 700;

export default {
  components: {
    SpotCard,
    DInput,
    DLoading,
    DNoMore
  },
  data () {
    return {
      touristName: '获取用户信息',
      touristId: undefined,
      tourist: undefined,
      
      location: {
        province: '江苏省',
        city: '南京市',
        region: '栖霞区'
      },
      
      loading: false,
      hasMore: true,

      spots: [],
      
      isSearch: false,
      searchWord: '',
      searchSpots: [],

      filter: '',
      pageName: 'tourist_main',

      scrollTop: 0,
      searchScrollTop: 0,
      show_gotop: false
    }
  },
  computed: {
    city () {
      var result = '';
      for (let key in this.location) {
        result = result + this.location[key] + '-'
      }
      return result.slice(0,result.length - 1);
    },
    toShowSpots () {
      if(this.isSearch){
        return this.searchSpots;
      } else {
        return this.spots;
      }
    }
  },
  mounted () {
    // 测试 TODO
    touristApi.logIn(
      () => {
        // resolve
        this.dLog('游客登录成功');
        this.touristId = wx.getStorageSync(TOURIST_ID);
    this.getSpots();
      },
      () => {
        this.dError('游客登录失败');
        // TODO 
      }
    );
    
    // this.getSpots();

    // wx.getSystemInfo({
    //   success: (res) => {
    //     wx.setStorage({
    //       key: 'screenHeight',
    //       data: res.screenHeight
    //     })
    //   }
    // })
  },
  methods: {
    handleScroll(event) {
      var top = event.mp.detail.scrollTop;

      if (top > SHOW_TOP_SCROLLTOP) {
        if (!this.show_gotop) {
          this.dLog("scrollTop 响应", "显示 gotop 浮标", top);
          this.show_gotop = true;
        }
      } else {
        if (this.show_gotop) {
          this.dLog("scrollTop 响应", "隐藏 gotop 浮标", top);
          this.show_gotop = false;
        }
      }
    },
    scrollToTop() {
      this.show_gotop = false;

      this.dLog("scrollToTop 方法调用");
      if (this.isSearch) {
          this.searchScrollTop = this.searchScrollTop == 0? 1: 0;
      } else {
          this.scrollTop = this.scrollTop == 0? 1: 0;
      }

      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    },
    dLog(message, ...optionalParams) {
        console.log(this.pageName, message, optionalParams);
    },
    dError(message, ...optionalParams) {
        console.error(this.pageName, message, optionalParams);
    },
    getSpots () {
      this.dLog("getSpots 方法调用");

      if (this.loading){
        this.dLog("加载中 return");
        return;
      }
      if (!this.hasMore) {
        this.dLog("已经加载全部 return")
        return;
      }

      // 加载
      this.loading = true;

      // 保留下上次最后的index
      let lastIndex = this.spots.length;

      // 取得景点列表
      spotApi.querySpots(
        this.location,
        lastIndex,
        (res) => {
          this.dLog("取得景点列表成功", res);

          this.hasMore = res.hasMoreSpot;

          for (let key in res.spotList) {
            this.spots.push(res.spotList[key]);
          }
          this.loading = false;
        },
        (err) => {this.dLog("取得景点列表失败", err);}
      )
    },
    handleLocationChange (event) {
      this.dLog("handleLocationChange 方法调用", event);

      var value = event.target.value;
      const province = value[0];
      const city = value[1];
      const region = value[2];

      if (this.location.province === province
      && this.location.city === city
      && this.location.region === region) {
        // 检查是否发生了变动
        this.dLog("所在城市未变动");
        return;
      } else {
        this.dLog("所在城市变动", location);

        const location = {
          province,
          city,
          region
        };

        // 检查该城市是否支持
        spotApi.checkLocationAvailable(
          location,
          (res) => {
            this.dLog("检查所在城市是否支持成功", res);

            if (res.isAvailable) {
              // 支持该地区
              this.location = location;

              // 初始化景点信息
              this.hasMore = true;
              this.spots.splice(0, this.spots.length);// 清空原 spot 数组

              // 上滑到顶部
              this.scrollToTop();

              // 重新获取景点信息
              this.getSpots();
            } else {
              // 不支持该地区
              this.dError(res.errMsg);// TODO 改成弹窗提示用户
            }
          },
          (rej) => {this.dLog("检查所在城市是否支持失败", rej);}
        );
      }
    },
    handleGetMoreSpots (event) {
      this.dLog("handleGetMoreSpots 方法调用");
      this.getSpots();
    },
    handleToPersonCenter (event) {
      this.dLog("handleToPersonCenter 方法调用");
      if(this.tourist === undefined) {
        console.log('tourist undefined')
        return;
      }
      console.log("跳转到个人中心");
      wx.setStorage({
        key: 'touristId',
        data: this.touristId,
        success: () => {
          wx.navigateTo({
            url: '/pages/tourist_center/main'
          })
        }
      })
    },
    handleGetUserInfo (event) {
      this.dLog("handleGetUserInfo 方法调用");
      console.log(event);
      if(this.tourist !== undefined) return;
      let userInfo = event.target.userInfo;
      this.tourist = {
        name: userInfo.nickName,
        avatar: userInfo.avatarUrl
      }
      this.touristName = this.tourist.name;
      wx.setStorage({
        key: 'tourist',
        data: this.tourist
      })
    },
    handleSearchFocus (event) {
      this.dLog("handleSearchFocus 方法调用");
      this.isSearch = true;
    },
    handleSearch (event) {
      this.dLog("handleSearch 方法调用");
      console.log('开始搜索')
      this.loading = true;
      spotApi.querySpotsByKeyword(
        this.searchWord,
        this.searchSpots.length,
        (res) => {
          if (res === undefined || res.length === 0) {
            this.hasMore = false;
          }
          for (let item in res) {
            this.searchSpots.push(res[item]);
          }
          this.loading = false;
        },
        (err) => {console.log(err);}
      )
    },
    handleClickBack (event) {
      this.dLog("handleClickBack 方法调用");
      this.searchWord = '';
      this.hasMore = true;
      this.isSearch = false;
      this.searchSpots = [];
    }
  }
}
</script>

<style scoped>
#head {
color: white;
z-index: 100;
}
.underline-span {
  text-decoration: underline;
}

.scroll {
  height: 1000rpx;
}

#back-btn {
  background-color: transparent;
  color: white;
  border-color: white;
}

#user-info-div {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

#user-info-btn {
  background-color: transparent;
  border-color: transparent;
  outline: none;
  /* text-decoration: underline; */
  display: inline-block;
  color: white;
  padding: 0;
}
</style>

<style scoped src="../../assets/style/d-head.css" />
<style scoped src="../../assets/style/d-search-list.css" />
<style scoped src="../../assets/style/d-btn.css"/>