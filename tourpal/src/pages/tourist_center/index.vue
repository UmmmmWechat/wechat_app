<template>
  <div id="out">
    <div id="profile">
      <!-- @Modify 我在这里主动引导用户授权，之后 才能获取微信上的个人信息 -->
      <div v-if="ableToGetProfile">
        <tourist-profile-card />
      </div>
      <div v-else style="text-align:center;padding:10px;">
         <button 
         size="mini"
         open-type="getUserInfo"
         @click="handleEnableToGetProfile"
         >
         大人，拜托授权让我得到你的微信头像等信息
         </button> 
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
import TouristProfileCard from '../../components/tourist/ProfileCard'
export default {
  components: {
    TouristProfileCard
  },
  data () {
    return {
        name: '',
        avatar: '',
        ableToGetProfile: false,
    }
  },
  mounted () {
  },
  methods: {
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
    handleEnableToGetProfile (event) {
      this.ableToGetProfile = true
      wx.getUserInfo ({
        success: res => {
          console.log(res)
          // 得到用户的微信信息
          let userInfo = res.userInfo
        }
      })
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
</style>

