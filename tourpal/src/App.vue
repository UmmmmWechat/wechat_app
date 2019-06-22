<script>
  import {isTestMode} from './api/httpRequestApi'
  import {WINDOW_HEIGHT} from './api/const/commonConst'
  import {GUIDE_MAIN, TOURIST_MAIN} from "./pages/pages_url";

  export default {
    created () {
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
      // 检查上次使用
      // this.lastUse();
    },
    // @Add 这是整个程序的开始钩子
    onLaunch () {
      if (!isTestMode) {
        try {
          // @Add 我在这里把所有的存储给删了，我们并不存在需要记住上次状态的情况，反而如果有上次情况会影响本次运行
          wx.clearStorageSync()
          // 在这里获取了屏幕可用高度
          let sysInfo = wx.getSystemInfoSync()
          let windowHeight = sysInfo.windowHeight
          wx.setStorageSync(WINDOW_HEIGHT, windowHeight)
          console.log('windowHeight: ' + windowHeight)
        } catch (error) {
          console.log(error)
        }
      }
    },
    methods: {
      lastUse () {
        const userType = wx.getStorageSync("user-type");
        if (!userType) return;
        const urls = {
          guide: GUIDE_MAIN,
          tourist: TOURIST_MAIN
        };
        const url = "/" + urls[userType];
        console.log(url);
        wx.redirectTo({
          url,
          fail: (e) => {
            console.error(e);
          }
        })
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
    box-sizing: border-box;
  }

  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
    font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', STHeiti, 'Microsoft Yahei', Tahoma, Simsun, sans-serif;
  }

</style>
