<template>
  <div
    class="quit-item"
    @click="handleQuit">
    退出登录
  </div>
</template>

<script>
  import {WINDOW_HEIGHT} from '../../api/const/commonConst'

  export default {
    name: 'DQuitItem',
    methods: {
      handleQuit () {
        console.log('退出登录')
        wx.reLaunch({
          url: '../role_select/main',
          success: () => {
            console.log('quit success');
            // 保留部分数据
            const windowHeight = wx.getStorageSync(WINDOW_HEIGHT);
            // 清空数据
            wx.clearStorage()
            // 保留部分数据
            wx.setStorage({key: WINDOW_HEIGHT, data: windowHeight})
          }
        })
      }
    }
  }
</script>

<style scoped>
  .quit-item:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .quit-item {
    width: 100%;
    padding: 30px 20px;

    color: #ff7f74;
    background-color: transparent;

    border: 1px solid;
    border-color: rgba(0, 0, 0, 0.1) transparent;

    margin-top: 50px;
  }
</style>
