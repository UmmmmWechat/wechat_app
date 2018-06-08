<template>
  <div id="out">
    <div id="profile">
      <!-- @Modify 我在这里主动引导用户授权，之后 才能获取微信上的个人信息 -->
      <div>
        <tourist-profile-card />
      </div>
      <div
        v-if="!ableToGetProfile"
        style="text-align:center;padding:10px;">
        <button
          id="user-info-btn"
          size="mini" 
          open-type="getUserInfo" 
          @getuserinfo="handleGetUserInfo">
          授权头像和昵称信息
        </button>
         <!-- <button 
         size="mini"
         open-type="getUserInfo"
         @click="handleEnableToGetProfile"
         >
         提供
         </button>  -->
      </div>
    </div>
    <div id="operation">
      <div 
      class="op-item"
      @click="handleToOrders">查看邀请</div>
      <div 
      class="op-item"
      @click="handleToTravelNotes">我的游记</div>
    </div>
  </div>
</template>

<script>
import touristApi from '../../api/tourist';
import TouristProfileCard from '../../components/tourist/ProfileCard';

import { TOURIST_INFO, TOURIST_ID } from '../../components/tourist/constant';
import { mockUserAvatorUrl } from '../../assets/image/imgMock';

export default {
  components: {
    TouristProfileCard
  },
  data () {
    return {
      tourist: {
        avatar: mockUserAvatorUrl,
        touristName: "体验游客",
        touristId: MOCK_TOURIST_ID,
      },

      ableToGetProfile: false,

      pageName: 'tourist_center'
    }
  },
  mounted () {
    // 取得游客ID
    this.tourist.touristId = wx.getStorageSync(TOURIST_ID);
    if (!tourist.touristId) {
      // 跳回登录界面
      wx.navigateBack({
        delta: 2
      });

      const errMsg = "未找到游客ID 需要先去登录";
      this.mountedError(errMsg, fai);

      return;
    }

    // 尝试取得游客信息
    const tourist = wx.getStorageSync(TOURIST_INFO);
    if (!tourist || tourist.touristId !== this.tourist.touristId) {
      // 未取得信息或信息过期
      const errMsg = "大人，请授权头像和昵称信息";
      this.mountedError(errMsg, fai);

      this.ableToGetProfile = false;

      return;
    }

    // 设置游客信息
    this.tourist = tourist;
    this.ableToGetProfile = true;
  },
  methods: {
    dLog(message, ...optionalParams) {
        console.log(this.pageName, message, optionalParams);
    },
    dError(message, ...optionalParams) {
        console.error(this.pageName, message, optionalParams);
    },
    mountedError(errMsg, fai) {
      this.dError(errMsg, fai);
      
      // 输出提示信息 
      wx.showToast({
          icon: 'none',
          title: errMsg
      });
    },
    handleToTravelNotes (event) {
      wx.navigateTo({
        url: '/pages/tourist_travel_records/main'
      })
    },
    handleToOrders (event) {
      wx.navigateTo({
        url: '/pages/tourist_orders/main'
      })
    },
    handleGetUserInfo (event) {
      this.dLog("handleGetUserInfo 方法调用", event);

      if(ableToGetProfile) {
        return;
      }

      let userInfo = event.target.userInfo;

      this.tourist = {
        name: userInfo.nickName,
        avatar: userInfo.avatarUrl
      };
      this.touristName = this.tourist.name;
      wx.setStorage({
        key: 'tourist',
        data: this.tourist
      })
      this.ableToGetProfile = true
    }
  }
}
</script>


<style scoped>
#operation {
  margin: 20rpx 0;
  border-top: rgba(0,0,0,0.1) 1px solid;
}

.op-item {
  padding: 30rpx 20rpx;
  border-bottom: rgba(0,0,0,0.1) 1px solid;

  color: #42b970;
  background-color: transparent;
}

.op-item:hover {
  background-color: rgba(0,0,0,0.1);
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

