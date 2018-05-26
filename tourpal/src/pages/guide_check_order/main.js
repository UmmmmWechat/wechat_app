import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '邀请查看',
        navigationBarTextStyle: 'white',
        navigationBarBackgroundColor: '#42b970',
    }
}