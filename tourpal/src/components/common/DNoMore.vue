<template>
  <div 
    id="no-more-item" 
    :style="{display: hasMore ? 'none' : 'block', color: color }">
    已经加载全部啦~
  </div>
</template>

<script>
export default {
  props: {
      hasMore: {
          type: Boolean,
          default: true
      },
      color: {
        type: String,
        default: '#42b970'
      }
  }
}
</script>


<style scoped>
#no-more-item {
  color: #42b970;
  text-align: center;
  margin: 20rpx;
}
</style>

