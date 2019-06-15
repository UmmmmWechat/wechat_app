<template>
  <div id="out">
    <div id="profile">
      <guide-profile-card/>
    </div>

    <div id="operation">
      <div
        class="op-item"
        @click="handleToInfo">
        个人信息
      </div>
      <div
        class="op-item"
        @click="handleToReview">
        向导履历
      </div>
      <quit-item/>
    </div>

    <div style="width: 100%; height: 50Px"></div>
    <GuideTabBar v-bind:current="currentTab"/>

  </div>
</template>

<script>
  import GuideProfileCard from '../../components/guide/ProfileCard'
  import GuideTabBar from "../../components/guide/GuideTabBar";
  import {GUIDE_USER_CENTER} from "../../utils/TabbarConfig";
  import QuitItem from '../../components/common/DQuitItem'

  export default {
    components: {
      GuideTabBar,
      GuideProfileCard，
      QuitItem
    },
    data () {
      return {
        currentTab: GUIDE_USER_CENTER.name
      }
    },
    methods: {
      handleToInfo (event) {
        console.log('向导个人中心-个人信息')
        wx.navigateTo({
          url: '../guide_center_info/main'
        })
      },
      handleToReview (event) {
        console.log('向导个人中心-向导履历')
        wx.navigateTo({
          url: '../guide_center_experience/main'
        })
      }
    }
  }
</script>

<style scoped>
  #operation {
    margin: 20px 0;
    border-top: rgba(0, 0, 0, 0.1) 1px solid;
  }

  .op-item {
    padding: 30px 20px;
    border-bottom: rgba(0, 0, 0, 0.1) 1px solid;

    color: #42b970;
    background-color: transparent;
  }

  .op-item:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
</style>
