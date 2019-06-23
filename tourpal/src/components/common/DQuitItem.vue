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
    width: 100%;
    padding: 30px 20px;

    color: #ff7f74;
    background-color: transparent;

    border: 1px solid;
    border-color: rgba(0, 0, 0, 0.1) transparent;

    margin-top: 50px;
  }
</style>
