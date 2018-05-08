<template>
  <div class="container" >
    <div class="role-card" id="card-1">
      <p class="title">踏着马蹄的过客</p>
      <p class="extra">匆匆路过你的城南和城北</p>
    </div>
    <div class="role-card" id="card-2">
      <p class="title">守着这城的故人</p>
      <p class="extra">等待着谁的到来</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
#card-1 {
  background-color: rgb(230, 75, 70);
  box-shadow: 0 0 30rpx rgb(230, 75, 70);
  /* background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(rgb(230, 75, 70)), to(rgb(247, 147, 144))); */
}
#card-2 {
  background-color: rgb(138, 207, 64);
  box-shadow: 0 0 30rpx rgb(138, 207, 64);
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

  box-shadow: 1px 1px 20rpx rgba(0,0,0,0.5);
}

.title {
  font-size: 1.5em;
  margin: 20rpx;
  color: rgba(255,255,255,0.9);
}

.extra {
  font-size: 0.7em;
  margin:10rpx;
  color: rgba(255,255,255,0.7);
}

</style>
