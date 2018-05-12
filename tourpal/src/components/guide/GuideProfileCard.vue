/* 向导个人信息卡片，用于向游客展示 */
/* contactable 表示是否允许联系， 也就是在通过邀请之后才能看到这个导游的联系方式 */
<template>
  <div class="d-card" id="out" >
      <div id="avatar-wrapper">
          <img
          style="width: 200rpx; height:200rpx; border-radius:50%;" 
          :src="guide.avatar" 
          alt="头像加载失败">
      </div>
      <div id="text-wrapper">
          <div class="text-item"><span class="title-span">姓名：</span><span>{{ guide.name }}</span></div>
          <div class="text-item"><span class="title-span">年龄：</span><span>{{ guide.age }}</span></div>
          <div class="text-item"><span class="title-span">性别：</span><span>{{ guide.gender }}</span></div>
          <template v-if="contactable">
              <div class="text-item"><span class="title-span">微信：</span><span>{{ guide.wechat }}</span></div>
              <div class="text-item"><span class="title-span">手机：</span><span>{{ guide.phone }}</span></div>
          </template>
          <div class="text-item">
              <span class="title-span">好评度：</span>
              <progress 
              style="width:400rpx;" 
              :percent="guide.goodFeedbackRate" 
              show-info/>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        contactable: {
            type: Boolean,
            default: false
        },
        guide: {
            type: Object,
            default: function () {
                return {
                    avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526121882561&di=c15bfa3211e5ac3187be885db53016d4&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2Fa054478cfce531e62c1bb5a122ed71f6193533d7.jpg',
                    name: '文向东',
                    age: 18,
                    gender: '男',
                    goodFeedbackRate: 80,
                    wechat: 'ericlpl',
                    phone: '112232323'
                }
            }
        }
    }
}
</script>

<style>
#out {
    color: gray;

    text-align: left;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    margin: 20rpx;
    padding: 10rpx;
}

#avatar-wrapper {
    margin: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;
}

#text-wrapper {
    margin: 20rpx;
}


.title-span {
    color: #42b970;
    font-weight: bold;
}
</style>

<style src="../../assets/style/d-card.css" scoped/>

