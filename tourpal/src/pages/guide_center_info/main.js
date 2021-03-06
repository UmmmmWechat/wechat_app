import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '个人中心-个人信息',
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#42b970'
  }
}
