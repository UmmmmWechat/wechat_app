<template>
<div>
  <div id="head" class="d-head">
    <div id="user-info-div">
      <span>欢迎：</span>
      <span class="underline-span">
        
        <span
        class="underline-span"
        @click="handleToPersonCenter">
          <open-data type="userNickName"/>
        <!-- {{ tourist.touristName }} -->
        <!-- @Modify 这里直接显示 id 吧 TODO -->
        <!-- {{ '游客：' + tourist.touristId }} -->
        </span>
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
        placeholder="搜索景点"
        confirm-type="search"
        :value="searchValue"
        @input="handleSearchInput"
        @on-focus="handleSearchFocus"
        @on-enter="handleResetSearch"/>
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
    <spot-card
    v-for="spot in toShowSpots"
    :key="spot.id"
    :spot="spot"
    />
    <d-loading :loading="loading"/>
    <d-no-more :has-more="hasMore" />
  </scroll-view>

  <section
    v-else
    class="d-search-list">
    <header>
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
    </header>

    <scroll-view
      class="scroll"
      scroll-y
      scroll-with-animation
      enable-back-to-top
      :scroll-top="searchScrollTop"
      @scroll="handleScroll"
      @scrolltolower="handleScrollToSearch">
      <spot-card
      v-for="spot in toShowSpots"
      :key="spot.id"
      :spot="spot"/>
      <d-loading :loading="loading" :color="'white'"/>
      <d-no-more :has-more="searchHasMore" :color="'white'"/>
    </scroll-view>
  </section>

  <section class="to-top-wrapper" v-if="show_gotop">
    <span id="to-top" @click="scrollToTop">
      Top
    </span>
  </section>
</div>
</template>


<script>
import SpotCard from '../../components/spot/SpotCard';
import DInput from '../../components/common/DInput';
import DLoading from '../../components/common/DLoading';
import DNoMore from '../../components/common/DNoMore';

import touristApi from '../../api/tourist';
import spotApi from '../../api/spot';

import { TOURIST_ID, TOURIST_INFO } from '../../components/tourist/constant';
import { MOCK_TOURIST_ID } from '../../api/mock/tourist_mock_data';
import { TOURIST_CENTER, ROLE_SELECT } from '../pages_url';
import { mockUserAvatorUrl } from '../../assets/image/imgMock';

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
      tourist: {
        avatar: mockUserAvatorUrl,
        touristName: "体验游客",
        touristId: MOCK_TOURIST_ID,
      },
      
      location: {
        province: '江苏省',
        city: '南京市',
        region: '栖霞区'
      },
      
      loading: false,

      hasMore: true,
      spots: [],
      
      searchHasMore: true,
      isSearch: false,
      searchWord: '',
      searchValue: undefined, // 用于清空搜索框
      searchSpots: [],

      pageName: 'tourist_main',

      scrollTop: undefined,
      searchScrollTop: undefined,
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
    this.tourist.touristId = wx.getStorageSync(TOURIST_ID);
    if (!this.tourist.touristId) {
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

    // 尝试取得游客信息
    const tourist = wx.getStorageSync(TOURIST_INFO);
    // 取得游客信息
    if (tourist) {
      this.dLog("取得游客信息", tourist);
      // 信息过期
      if (tourist.touristId !== this.tourist.touristId) {
        this.dLog("游客信息过期");
        // 删除过期信息
        wx.removeStorage({
          key: TOURIST_INFO
        })
      } else {
        this.dLog("游客信息有效");
        // 设置游客信息
        this.tourist.avatar = tourist.avatar;
        this.tourist.touristName = tourist.touristName;
      }
    }
    
    this.getSpots();
  },
  methods: {
    dLog(message, ...optionalParams) {
        console.log(this.pageName, message, optionalParams);
    },
    dError(message, ...optionalParams) {
        console.error(this.pageName, message, optionalParams);
    },
    handleScroll(event) {
      // this.dLog("handleScroll 响应");

      var top = event.mp.detail.scrollTop;

      if (top > SHOW_TOP_SCROLLTOP) {
        if (!this.show_gotop) {
          this.dLog("显示 gotop 浮标", top);
          this.show_gotop = true;
        }
      } else {
        if (this.show_gotop) {
          this.dLog("隐藏 gotop 浮标", top);
          this.show_gotop = false;
        }
      }
    },
    scrollToTop() {
      this.dLog("scrollToTop 方法调用");

      this.show_gotop = false;

      if (this.isSearch) {
          this.searchScrollTop = 0;
          setTimeout(
            () => {
              this.searchScrollTop = undefined;
            }, 500);
      } else {
          this.scrollTop = 0;
          setTimeout(
            () => {
              this.scrollTop = undefined;
            }, 500);
      }

      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    },
    getSpots() {
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
    handleLocationChange(event) {
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

              if (this.isSearch) {
                this.handleResetSearch(event);
              } else {
                this.resetSpots();

                wx.pageScrollTo({
                  scrollTop: 0,
                  duration: 300
                });
              }
            } else {
              // 不支持该地区
              this.dError(res.errMsg);
          
              // 输出提示信息 
              wx.showToast({
                icon: 'none',
                title: res.errMsg
              });
            }
          },
          (rej) => {this.dLog("检查所在城市是否支持失败", rej);}
        );
      }
    },
    resetSpots() {
      // 初始化景点信息
      this.hasMore = true;
      this.spots.splice(0, this.spots.length);// 清空原 spot 数组
      
      // 重新获取景点信息

      // 加载
      this.loading = true;

      // 取得景点列表
      spotApi.querySpots(
        this.location,
        0,
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

      // 上滑到顶部
      this.show_gotop = false;
      
      this.scrollTop = 0;
      setTimeout(
        () => {
          this.scrollTop = undefined;
        }, 500);
    },
    handleGetMoreSpots(event) {
      this.dLog("handleGetMoreSpots 方法调用", event);
      this.getSpots();
    },
    handleSearchFocus(event) {
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
      this.searchSpots.splice(0, this.searchSpots.length);// 清空搜索的 spot 数组

      // 重新搜索

      // 加载
      this.loading = true;

      // 按照关键词搜索景点
      spotApi.querySpotsByKeywordAndCity(
        this.searchWord,
        this.location,
        // @Modified 这里我改了，只需要传 city TODO
        // this.location.city,
        0,
        (res) => {
          this.dLog("搜索景点列表成功", res);

          this.searchHasMore = res.hasMoreSpot;

          for (let key in res.spotList) {
            this.searchSpots.push(res.spotList[key]);
          }

          // 更新景点显示
          this.resetSpots();
        },
        (fai) => {
            const errMsg = "搜索景点列表失败";
            this.dError(errMsg, fai);
            
            // 输出提示信息 
            wx.showToast({
              icon: 'none',
              title: errMsg
            });
        }
      );

      // 上滑到顶部
      this.scrollToTop();
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
      let lastIndex = this.searchSpots.length;

      // 按照关键词搜索景点
      spotApi.querySpotsByKeywordAndCity(
        this.searchWord,
        this.location,
        lastIndex,
        (res) => {
          this.dLog("搜索景点列表成功", res);

          this.searchHasMore = res.hasMoreSpot;

          for (let key in res.spotList) {
            this.searchSpots.push(res.spotList[key]);
          }
          
          this.loading = false;
        },
        (fai) => {
            const errMsg = "搜索景点列表失败";
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
      this.searchSpots.splice(0, this.searchSpots.length);// 清空搜索的 spot 数组

      // 回滚
      this.scrollToTop();
    },
    handleToPersonCenter(event) {
      this.dLog("handleToPersonCenter 方法调用", event);

      const url = `/${TOURIST_CENTER}`;
      this.dLog('跳转', url);
      wx.navigateTo({ url });
    }
  }
}
</script>

<style scoped>
#head {
color: white;
z-index: 100;
}

#user-info-div {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.underline-span {
  text-decoration: underline;
}

#search {
  margin: 20rpx 0;
  font-size: 0.8em; 
}

.scroll {
  height: 1200rpx;
}

.to-top-wrapper {
  position: fixed;
  left: 5%;
  bottom: 10%;
  opacity: 0.7;
}

#to-top {
  height: 100rpx;
  width: 100rpx;
  border-radius: 50%;
  /* border: solid #42b9704d;
  box-shadow: #42b9704d 0 0 5px;
  background: #a2ddb9af; */
  border: solid #42b970;
  box-shadow: #42b970 0 0 5px;
  background: #a2ddb9;
  
  color: #314237af;
  font-weight: bold;

  display: flex;
  flex-direction: column;
  align-items: center;/*垂直居中*/
  justify-content: center;/*水平居中*/
}
</style>

<style scoped src="../../assets/style/d-head.css" />
<style scoped src="../../assets/style/d-search-list.css" />
<style scoped src="../../assets/style/d-btn.css"/>