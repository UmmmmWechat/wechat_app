<template>
  <div class="container" >
    <div 
    class="role-card" 
    id="card-1"
   >
      <p class="title">游客</p>
      <p class="extra">我达达的马蹄，美丽的错误</p>
    </div>
    <div 
    class="role-card" 
    id="card-2"
    @click="handleChooseGuide">
      <p class="title">向导</p>
      <p class="extra">守着这一方水土，等待着谁的到来</p>
    </div>
  </div>
</template>

<script>
import guideApi from '../../api/guide'
export default {
  data () {
    return {
    }
  },
  methods: {
    handleChooseGuide () {
      console.log('选择了引路人');
      guideApi.queryIfNew(
        '',
        (res) => {
          // 是新的guide
          if (res) {
            const url = '../guide_sign_up/main';
            wx.navigateTo({ url });
          }
        },
        (err) => {
          console.log(err);
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
#card-1 {
  background-color: rgb(255, 127, 116);
  box-shadow: 0 0 30rpx rgb(255, 127, 116);
  /* background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(rgb(230, 75, 70)), to(rgb(247, 147, 144))); */
}
#card-2 {
  background-color: rgb(254, 185, 126);
  box-shadow: 0 0 30rpx rgb(254, 185, 126);
   /* background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(rgb(138, 207, 64)), to(rgb(198, 248, 144))); */
}
.role-card {
  width: 600rpx;
  height: 200rpx;
  border-radius: 10px;
  margin:50rpx;
  text-align: center;
  
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 10rpx;
}

.role-card:active {
  transform: translate(0rpx, 5rpx);
}

.title {
  font-size: 1.5em;
  margin: 20rpx;
  color: rgba(255,255,255,0.9);
}

.extra {
  font-size: 0.9em;
  margin:10rpx;
  color: rgba(255,255,255,0.7);
}

</style>
