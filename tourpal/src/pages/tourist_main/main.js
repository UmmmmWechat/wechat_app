import Vue from 'vue'
import App from './index'
import _ from 'lodash'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '游伴，有伴'
  }
}
