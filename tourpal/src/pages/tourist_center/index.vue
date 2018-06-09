<template>
<div id="out">
  <div id="profile">
    <tourist-profile-card/>
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

import { TOURIST_TRAVEL_RECORDS, TOURIST_ORDERS } from '../pages_url';
import { MOCK_TOURIST_ID } from '../../api/mock/tourist_mock_data';
import { TOURIST_ID } from '../../api/const/touristConst';

export default {
  components: {
    TouristProfileCard
  },
  data () {
    return {
      touristId: MOCK_TOURIST_ID,

      pageName: 'tourist_center'
    }
  },
  mounted () {
    // 取得游客ID
    this.touristId = wx.getStorageSync(TOURIST_ID);
    if (!this.touristId) {
      // 跳回登录界面
      wx.navigateBack({
        delta: 2
      });

      const errMsg = "未找到游客ID 需要先去登录";
      this.dError(errMsg);
      
      // 输出提示信息 
      wx.showToast({
          icon: 'none',
          title: errMsg
      });

      return;
    }
  },
  methods: {
    dLog(message, ...optionalParams) {
        console.log(this.pageName, message, optionalParams);
    },
    dError(message, ...optionalParams) {
        console.error(this.pageName, message, optionalParams);
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
</style>
