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
        url: 'https://www.wenxiangdong.cn/spots/by-keyword',
        method: 'GET',
        data: {
          keyword: '夫',
          lastIndex: 0
        },
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
