<!-- tourist的个人信息卡片 -->
<template>
  <div id="wrapper">
    <div id="avatar">
      <open-data style="margin:auto;" type="userAvatarUrl"/>
    </div>

    <div id="text">
      <open-data type="userNickName"/>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      avatar: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>
  #wrapper {
    text-align: center;
    padding: 20px;
  }

  #text {
    margin-top: 20px;
    padding: 20px;
  }

  #avatar {
    height: 200px;
    width: 200px;
    text-align: center;
    position: relative;
    left: 265px;
  }
</style>
