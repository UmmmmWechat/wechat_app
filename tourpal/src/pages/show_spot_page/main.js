import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '景点详情',
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#42b970'
  }
}
