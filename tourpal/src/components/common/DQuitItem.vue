<template>
  <div
    class="quit-item"
    @click="handleQuit">
    退出登录
  </div>
</template>

<script>
  export default {
    name: 'DQuitItem',
    methods: {
      handleQuit () {
        console.log('退出登录')
        wx.reLaunch({
          url: '../role_select/main'
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
    position: fixed;
    width: 100%;
    bottom: 0;
    padding: 30px 0;
    color: #ff7f74;
    background-color: transparent;
    text-align: center;

    border: 1px solid;
    border-color: rgba(0, 0, 0, 0.1) transparent;
  }
</style>
