<template>
  <div id="out">
    <div id="profile">
      <tourist-profile-card 
      :name="tourist.name" 
      :avatar="tourist.avatar"/>
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
      tourist: {},
    }
  },
  mounted () {
    wx.getStorage({
      key: 'touristId',
      success: (res) => {
        console.log(res.data);
        touristApi.queryTouristById(
          res.data,
          (res) => {
            this.tourist = res;
          },
          (err) => {}
        );
      },
      fail: (err) => {
        wx.showToast({
          icon: 'none',
          title: '个人信息获取失败'
        })
      }
    })
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

