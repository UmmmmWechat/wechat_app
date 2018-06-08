/* 含标题的文本展示 */
<template>
  <div id="wrapper">
      <div class="label">
        {{ title }}
      </div>
      <div style="'text-align': left; padding: 5rpx;">
        {{ text }}
      </div>
  </div>
</template>


<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>


<style scoped>
#wrapper {
    display: flex;
    flex-direction: column;
    padding: 20rpx;
}
</style>

<style scoped src="../../assets/style/d-form-item.css"/>

