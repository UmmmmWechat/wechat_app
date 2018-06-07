<template>
<div>
    <button @click="handleClick">测试</button>
</div>  
</template>

<script>
export default {
  methods: {
    handleClick () {
      wx.request({
        url: 'http://111.231.99.122:3000/index',
        success: res => {
          console.log(res)
        }
      })
    }
  }
}
</script>

<style>

</style>
