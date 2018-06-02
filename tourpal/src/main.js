import Vue from 'vue'
import App from './App'
import 'animate.css'
// import iView from 'iview';
// import 'iview/dist/styles/iview.css';
import './assets/style/index.css'

Vue.config.productionTip = false
App.mpType = 'app'


const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      'pages/role_select/main',
      'pages/guide_sign_up/main',
      '^pages/tourist_main/main',
      'pages/tourist_invite_guide/main',
      'pages/tourist_rate_order/main',
      'pages/tourist_orders/main',
      'pages/tourist_travel_records/main',
      'pages/test/main',
      'pages/show_spot_guide/main',
      'pages/select_spots/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#42b970',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    }
    // "tabBar": {
    //   backgroundColor: '#ffffff',
    //   color: 'black',
    //   borderStyle: 'white',
    //   "list": [{
    //     "pagePath": "pages/tourist_main/main",
    //     "text": "景点"
    //   }, {
    //     "pagePath": "pages/tourist_orders/main",
    //     "text": "个人中心"
    //   }]
    // }
  }
}
