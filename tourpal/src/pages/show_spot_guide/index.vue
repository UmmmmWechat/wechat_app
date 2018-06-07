<template>
<div>
  <div id="head" class="d-head">
    <div id="title">{{ spotName }}</div>

    <div id="search">
      <icon type="search" size="10" color="white"/>
      <div style="display:inline-block;width:90%;">
        <d-input
        v-model="searchWord"
        placeholder="搜索向导"
        confirm-type="search"
        @on-focus="handleSearchFocus"
        @on-enter="handleResetSearch"
        />
      </div>     
    </div>
  </div>

  <scroll-view
  v-if="!isSearch" 
  class="scroll" 
  id="guide-list"
  :scroll-top="scrollTop"
  @scroll="handleScroll"
  @scrolltolower="getGuides"
  scroll-y
  enable-back-to-top
  scroll-with-animation
  >
    <guide-profile-card
      v-for="guide in toShowGuides"
    :key="guide.id"
    :guide="guide"/>
    <d-loading :loading="loading" />
    <d-no-more :has-more="hasMore" />
  </scroll-view>

  <section
  v-else
  class="d-search-list">
    <header>
    <div style="text-align:center;padding:10rpx;">
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
      <guide-profile-card
      v-for="guide in toShowGuides"
      :key="guide.id"
      :guide="guide"/>
      <d-loading :loading="loading" :color="'white'" />
      <d-no-more :has-more="searchHasMore" :color="'white'"/>
    </scroll-view>
  </section>

  <section class="to-top-wrapper" v-if="show_gotop">
    <a id="to-top" @click="scrollToTop">
      Top
    </a>
  </section>
</div>
</template>

<script>
import touristApi from '../../api/tourist';

import GuideProfileCard from '../../components/guide/GuideProfileCard';
import DLoading from '../../components/common/DLoading';
import DInput from '../../components/common/DInput';
import DNoMore from '../../components/common/DNoMore';

import { D_SPOT_ID, D_SPOT_NAME } from '../../api/const/spotConst';

const SHOW_TOP_SCROLLTOP = 700;

export default {
  components: {
    GuideProfileCard,
    DLoading,
    DInput,
    DNoMore
  },
  data () {
    return {
      spotName: "spotName",
      spotID: "spotID",

      loading: false,
      
      hasMore: true,
      guides: [],
      
      isSearch: false,
      searchHasMore: true,
      searchWord: '',
      searchGuides: [],

      pageName: 'show_spot_guide',

      scrollTop: undefined,
      searchScrollTop: undefined,
      show_gotop: false
    }
  },
  computed: {
    toShowGuides () {
      return this.isSearch ? this.searchGuides : this.guides;
    }
  },
  mounted() {
    // 取得景点ID
    wx.getStorage({
      key: D_SPOT_ID,
      success: (res) => {
        this.dLog("取得景点ID完成", res);
        this.spotID = res.data;

        // 取得景点名称
        wx.getStorage({
          key: D_SPOT_NAME,
          success: (res) => {
            this.dLog("取得景点名称完成", res);
            this.spotName = res.data;
      
            this.hasMore = true;
            this.guides.splice(0, this.guides.length);// 清空原 guides 数组
            
            this.isSearch = false,
            this.searchHasMore = true,
            this.searchWord = '';
            this.searchGuides.splice(0, this.searchGuides.length);// 清空原 searchGuides 数组
            
            this.show_gotop = false;
            
            this.getGuides();
          },
          fail: (fai) => {
              const errMsg = "取得景点名称失败";
              this.dError(errMsg, fai);

              wx.navigateBack();
              
              // 输出提示信息 
              wx.showToast({
                  icon: 'none',
                  title: errMsg
              });

              wx.navigateBack();
          }
        });
      },
      fail: (fai) => {
          const errMsg = "取得景点ID失败";
          this.dError(errMsg, fai);

          wx.navigateBack();
          
          // 输出提示信息 
          wx.showToast({
              icon: 'none',
              title: errMsg
          });

          wx.navigateBack();
      }
    })
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
    getGuides() {
      this.dLog("getGuides 方法调用");

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
      let lastIndex = this.guides.length;

      // 取得导游列表
      touristApi.queryGuideBySpot(
        this.spotID,
        lastIndex,
        (res) => {
          this.dLog("通过景点取得导游列表成功", res);

          this.hasMore = res.hasMoreGuide;

          for (let key in res.guideList) {
            this.guides.push(res.guideList[key]);
          }
          this.loading = false;
        },
        (rej) => {this.dLog("通过景点取得导游列表失败", rej);}
      )
    },
    handleSearchFocus(event) {
      this.dLog("handleSearchFocus 方法调用", event);
      this.isSearch = true;
    },
    handleResetSearch (event) {
      this.dLog("handleResetSearch 方法调用", event);

      this.searchHasMore = true;
      this.searchGuides.splice(0, this.searchGuides.length);// 清空搜索的 spot 数组

      // 重新搜索

      // 加载
      this.loading = true;

      // 按照关键词搜索向导
      touristApi.queryGuideByKeyword(
        this.searchWord,
        0,
        (res) => {
          this.dLog("搜索向导列表成功", res);

          this.searchHasMore = res.hasMoreSpot;

          for (let key in res.guideList) {
            this.searchGuides.push(res.guideList[key]);
          }

          this.loading = false;
        },
        (fai) => {
            const errMsg = "搜索向导列表失败";
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
      let lastIndex = this.searchGuides.length;

      // 按照关键词搜索向导
      touristApi.queryGuideByKeyword(
        this.searchWord,
        lastIndex,
        (res) => {
          this.dLog("通过关键词搜索导游列表成功", res);

          this.searchHasMore = res.hasMoreGuide;

          for (let key in res.guideList) {
            this.searchGuides.push(res.guideList[key]);
          }
          
          this.loading = false;
        },
        (rej) => {this.dLog("通过关键词搜索导游列表失败", rej);}
      )
    },
    handleClickBack (event) {
      this.dLog("handleClickBack 方法调用", event);

      // 回滚
      this.scrollToTop();

      this.isSearch = false;
    },
    handleClearSearch(event) {
      this.dLog("handleClickBack 方法调用", event);

      // 重置属性
      this.searchWord = "";
      this.searchHasMore = true;
      this.searchGuides.splice(0, this.searchGuides.length);// 清空搜索的 spot 数组
      
      // 返回
      this.handleClickBack(event);
    }
  }
}
</script>

<style>
#guide-list {
  height: 1000rpx;
}

#title {
  text-align: left;
  font-size: 1.3em;
  font-weight: bold;
  color: white;
}

#search {
  margin: 20rpx 0;
  font-size: 0.8em; 
}

.scroll {
  height: 1000rpx;
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
<style scoped src="../../assets/style/d-head.css"/>
<style scoped src="../../assets/style/d-search-list.css"/>
<style scoped src="../../assets/style/d-btn.css"/>