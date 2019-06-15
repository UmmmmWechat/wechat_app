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

  }
</script>

<style scoped>
  #wrapper {
    min-height:400px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }

  #text {
    margin-top: 20px;
    padding: 20px;
  }

  #avatar {
    height: 200px;
    width: 200px;

    border: thin solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    overflow: hidden;
  }
</style>
