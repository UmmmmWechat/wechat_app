<template class="page">
  <div class="container">
    <div 
    class="role-card" 
    id="tourist-role-card"
    @click="handleChooseTourist">
      <p class="title">{{ touristPrompot.title }}</p>
      <p class="extra">{{ touristPrompot.extra }}</p>
    </div>
    <div 
    class="role-card" 
    id="guide-role-card"
    @click="handleChooseGuide">
      <p class="title">{{ guidePrompt.title }}</p>
      <p class="extra">{{ guidePrompt.extra }}</p>
    </div>
  </div>
</template>

<script>
import { TOURIST_MAIN, GUIDE_SIGN_UP, GUIDE_MAIN } from '../pages_url';

import guideApi from '../../api/guide';
import touristApi from '../../api/tourist';

export default {
  data () {
    return {
      touristPrompot: {
        title: "游客",
        extra: "我达达的马蹄，美丽的错误"
      },
      guidePrompt: {
        title: "向导",
        extra: "守着这一方水土，等待着谁的到来"
      },
      pageName: "role_select"
    }
  },
  methods: {
    dLog(message, ...optionalParams) {
        console.log(this.pageName, message, optionalParams);
    },
    dError(message, ...optionalParams) {
        console.error(this.pageName, message, optionalParams);
    },
    handleChooseTourist() {
      // 选择游客
      this.dLog('选择了游客');

      touristApi.logIn(
        (suc) => {
          // resolve
          this.dLog('游客登录成功', suc);

          const url = `/${TOURIST_MAIN}`;
          this.dLog('跳转', url);
          wx.redirectTo({ url });
        },
        (fai) => {
            const errMsg = "游客登录失败";
            this.dError(errMsg, fai);
            
            // 输出提示信息 
            wx.showToast({
              icon: 'none',
              title: errMsg
            });
        }
      );
    },
    handleChooseGuide () {
      // 选择向导
      this.dLog('选择了向导');

      guideApi.logIn(
        (res) => {
          // resolve
          this.dLog('向导登录成功', res);

          if (res.isNewGuide) {
            const url = `/${GUIDE_SIGN_UP}`;
            this.dLog('跳转', url);
            wx.navigateTo({ url });
          } else {
            const url = `/${GUIDE_MAIN}`;
            this.dLog('跳转', url);
            wx.switchTab({ url });
          }
        },
        (fai) => {
          const errMsg = "向导登录失败";
          this.dError(errMsg, fai);
          
          // 输出提示信息 
          wx.showToast({
            icon: 'none',
            title: errMsg
          });
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  position: fixed;
  
  height: 100%;
  width: 100%;
  padding-bottom: 20%;

  display: flex;
  flex-direction: column;
  align-items: center;/*垂直居中*/
  justify-content: center;/*水平居中*/
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

#tourist-role-card {
  background-color: rgb(255, 127, 116);
  box-shadow: 0 0 30rpx rgb(255, 127, 116);
  /* background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(rgb(230, 75, 70)), to(rgb(247, 147, 144))); */
}

#guide-role-card{
  background-color: rgb(254, 185, 126);
  box-shadow: 0 0 30rpx rgb(254, 185, 126);
   /* background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(rgb(138, 207, 64)), to(rgb(198, 248, 144))); */
}

</style>
