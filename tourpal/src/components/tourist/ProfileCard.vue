/* tourist的个人信息卡片 */

<template>
  <div id="wrapper">
      <div id="avatar"> 
          <!-- <img 
            id="avatar"
            :src="avatar" 
            alt="头像加载失败"
            > -->
            <open-data style="margin:auto;" type="userAvatarUrl"/>
      </div>
      <div id="text"><open-data type="userNickName"/></div>
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
    },
    mounted () {
    }
}
</script>

<style scoped>
#wrapper {
   
    text-align: center;
    padding: 20rpx;
}

#text {
    padding: 20rpx;
}

#avatar {
    height: 200rpx;
    width: 200rpx;
    text-align: center;
    position: relative;
    left: 265rpx;
}
</style>
