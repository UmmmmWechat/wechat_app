<!-- 含标题的文本展示 -->
<template>
  <div class="wrapper">
    <div class="label">
      {{ title }}
    </div>
    <div class="info">
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
</style>

<style scoped src="../../assets/style/d-form-item.css"></style>

