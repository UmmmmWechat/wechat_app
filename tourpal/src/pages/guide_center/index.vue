<template>
  <div id="out">
    <div id="profile">
      <guide-profile-card/>
    </div>

    <div id="operation">
      <div
      class="op-item"
      @click="handleToInfo">个人信息</div>
      <div
      class="op-item"
      @click="handleToReview">向导履历</div>
    </div>
  </div>
</template>

<script>
import GuideProfileCard from '../../components/guide/ProfileCard'

export default {
  components: {
    GuideProfileCard
  },
  data () {

  },
  methods: {
    handleToInfo(event) {
      console.log("向导个人中心-个人信息")
    },
    handleToReview(event) {
      console.log("向导个人中心-向导履历")
    },
  }
}
</script>

<style>
#operation {
  margin: 20rpx 0;
  border-top: rgba(0,0,0,0.1) 1px solid;
}

.op-item {
  padding: 30rpx 20rpx;
  border-bottom: rgba(0,0,0,0.1) 1px solid;

  color: #42b970;
  background-color: transparent;
}

.op-item:hover {
  background-color: rgba(0,0,0,0.1);
}
</style>
