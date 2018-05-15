/* tourist的个人信息卡片 */

<template>
  <div id="wrapper">
      <div>
          <img 
          id="avatar"
            :src="avatar" 
            alt="头像加载失败"
            >
      </div>
      <div id="text">{{ name }}</div>
  </div>
</template>

<script>
export default {
    props: {
        avatar: {
            type: String,
            required: true
        },
        name: {
            type:String,
            required: true
        }
    }
}
</script>

<style scoped>
#wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 20rpx;
}

#text {
    padding: 20rpx;
}

#avatar {
    margin: 20rpx;
    height: 200rpx;
    width: 200rpx;
    border-radius: 50%;
}
</style>
