<template>
<div>
  <div id="head" class="d-head">
      <div id="user-info-div">
        <span>欢迎：</span>
        <span
        class="underline-span"
        
        >
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
        <span>你所旅游的地点：</span>
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
    <d-loading :loading="loading" color="white"/>
    <d-no-more :has-more="hasMore" color="white"/>
  </scroll-view>
</div>
</template>


<script>
import SpotCard from '../../components/spot/SpotCard'
import DInput from '../../components/common/DInput'
import DLoading from '../../components/common/DLoading'
import DNoMore from '../../components/common/DNoMore'
import touristApi from '../../api/tourist'
import spotApi from '../../api/spot'
export default {
  components: {
    SpotCard,
    DInput,
    DLoading,
    DNoMore
  },
  data () {
    return {
      location: {
        province: '江苏省',
        city: '南京市',
        region: '栖霞区'
      },
      spots: [],
      searchSpots: [],
      touristName: '获取用户信息',
      touristId: 'id',
      tourist: undefined,
      filter: '',
      loading: false,
      hasMore: true,
      isSearch: false,
      searchWord: ''
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
    // // wx.showTabBar();
    // wx.login({
    //   success: (res) => {
    //     console.log(res.code);
    //     wx.getUserInfo({
    //       success: (res2) => {
    //         var userInfo = res2.userInfo;
    //         console.log(userInfo);
    //         this.touristName = userInfo.nickName;
    //       }
    //     })
    //   }
    // })
    console.log('request')
    wx.request({
      url: 'https://www.injusalon.com/count/user/getRealInfo',
      data: {
        userName: '10k'
      },
      success: (res) => {
        console.log(res)
      }
    })
    this.getSpots();
    wx.getSystemInfo({
      success: (res) => {
        wx.setStorage({
          key: 'screenHeight',
          data: res.screenHeight
        })
      }
    })
  },
  methods: {
    getSpots () {
      if (this.loading) return;
      if (!this.hasMore) return;
      this.loading = true;
      // 保留下上次最后的index
      let lastIndex = this.spots.length;
      console.log('get spots')
      touristApi.querySpots(
        this.location,
        lastIndex,
        (res) => {
          if(res === undefined || res.length === 0) {
            this.hasMore = false;
          }
          for (let key in res) {
            this.spots.push(res[key]);
          }
          this.loading = false;
        },
        (err) => {console.log(err);}
      )
    },
    handleLocationChange (event) {
      console.log(event);
      var value = event.target.value;
      this.location = {
        province: value[0],
        city: value[1],
        region: value[2]
      }
    },
    handleGetMoreSpots (event) {
      this.getSpots();
    },
    handleToPersonCenter (event) {
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
      this.isSearch = true;
    },
    handleSearch (event) {
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