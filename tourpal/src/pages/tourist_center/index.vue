<template>
<div id="out">
  <div id="profile">
    <tourist-profile-card />
  </div>

  <div id="operation">
    <div 
    class="op-item"
    @click="handleToOrders">查看邀请</div>

    <div 
    class="op-item"
    @click="handleToTravelNotes">我的游记</div>
  </div>

  <div v-if="!ableToGetProfile"
    id="user-info-btn-wrapper">
    <button
      id="user-info-btn"
      size="mini" 
      open-type="getUserInfo" 
      @getuserinfo="handleGetUserInfo">
      授权头像和昵称信息
    </button>
  </div>
</div>
</template>

<script>
import touristApi from '../../api/tourist';
import TouristProfileCard from '../../components/tourist/ProfileCard';

import { TOURIST_INFO, TOURIST_ID } from '../../components/tourist/constant';
import { mockUserAvatorUrl } from '../../assets/image/imgMock';
import { TOURIST_TRAVEL_RECORDS, TOURIST_ORDERS } from '../pages_url';
import { MOCK_TOURIST_ID } from '../../api/mock/tourist_mock_data';

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

      // 是否取得了用户信息
      ableToGetProfile: false,

      pageName: 'tourist_center'
    }
  },
  mounted () {
    // 取得游客ID
    this.tourist.touristId = wx.getStorageSync(TOURIST_ID);
    if (!this.tourist.touristId) {
      // 跳回登录界面
      wx.navigateBack({
        delta: 2
      });

      const errMsg = "未找到游客ID 需要先去登录";
      this.mountedError(errMsg);

      return;
    }

    wx.removeStorageSync(TOURIST_INFO);

    // 尝试取得游客信息
    const tourist = wx.getStorageSync(TOURIST_INFO);
    if (!tourist || tourist.touristId !== this.tourist.touristId) {
      // 未取得信息或信息过期
      const errMsg = "大人，请授权头像和昵称信息";
      this.mountedError(errMsg);

      this.ableToGetProfile = false;

      return;
    }

    // 设置游客信息
    this.tourist.avatar = tourist.avatar;
    this.tourist.touristName = tourist.touristName;
    this.ableToGetProfile = true;
  },
  methods: {
    dLog(message, ...optionalParams) {
        console.log(this.pageName, message, optionalParams);
    },
    dError(message, ...optionalParams) {
        console.error(this.pageName, message, optionalParams);
    },
    mountedError(errMsg, ...fai) {
      this.dError(errMsg, fai);
      
      // 输出提示信息 
      wx.showToast({
          icon: 'none',
          title: errMsg
      });
    },
    handleToTravelNotes (event) {
      this.dLog("handleToTravelNotes 方法调用", event);
      
      const url = `/${TOURIST_TRAVEL_RECORDS}`;
      this.dLog('跳转', url);
      wx.navigateTo({ url });
    },
    handleToOrders (event) {
      this.dLog("handleToOrders 方法调用", event);
      
      const url = `/${TOURIST_ORDERS}`;
      this.dLog('跳转', url);
      wx.navigateTo({ url });
    },
    handleGetUserInfo (event) {
      this.dLog("handleGetUserInfo 方法调用", event);

      // 已经取得了
      if(this.ableToGetProfile) {
        return;
      }

      let userInfo = event.target.userInfo;

      if (!userInfo) {
        // 取得用户信息失败
        const errMsg = "大人，授权失败啦QWQ";
        this.mountedError(errMsg, event);
        return;
      }

      // 设置游客信息
      this.tourist.avatar = userInfo.avatarUrl;
      this.tourist.touristName = userInfo.nickName;

      // 存储游客信息
      wx.setStorage({
        key: TOURIST_INFO,
        data: this.tourist,
        success: (suc) => {
          this.dLog("存储游客信息成功", suc);
          this.ableToGetProfile = true;
        }
      })
    }
  }
}
</script>

<style scoped>
#profile {
  padding: 10% 0 10rpx 0;
}

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
  display: inline-block;
  color: #42b970;
  padding: 0 20rpx;
}

#user-info-btn-wrapper {
  text-align:center;
  
  min-height: 20rpx;
  width: 100%;
  padding-bottom: 50rpx;
  position: fixed;
  bottom: 0;

  display: flex;
  flex-direction: column;
  align-items: center;/*垂直居中*/
  justify-content: center;/*水平居中*/
}
</style>
