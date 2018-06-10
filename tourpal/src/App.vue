<script>
import { isTestMode } from './api/httpRequestApi';
export default {
  created () {
    console.log('created');
    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // console.log('app created and cache logs by setStorageSync')
    // wx.chooseLocation({
    //   success: (res) => {
    //     console.log(res);
    //   }
    // })
  },
  // @Add 这是整个程序的开始钩子
  onLaunch () {
    console.log('launch');
    if (!isTestMode) {
      try {
        // @Add 我在这里把所有的存储给删了，我们并不存在需要记住上次状态的情况，反而如果有上次情况会影响本次运行
        wx.clearStorageSync()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* padding: 200rpx 0; */
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}

</style>
