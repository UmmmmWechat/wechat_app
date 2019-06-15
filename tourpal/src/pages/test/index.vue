<template>
  <div>
    <button @click="handleClick">测试</button>
    <Logo/>
<!--    <DTabBar v-bind:tabs="tabs" v-bind:current="current"/>-->
<!--    <GuideTabBar v-bind:current="guideCurrent"/>-->
    <TouristTabBar v-bind:current="touristCurrent"/>
  </div>
</template>

<script>
  import guide from '../../api/guide'
  import DDatePicker from '../../components/common/DDatePicker'
  import {GUIDE_HOME, TOURIST_HOME, touristTabbarConfig} from "../../utils/TabbarConfig";
  import Logo from "../../components/common/Logo";
  import DTabBar from "../../components/common/DTabBar";
  import GuideTabBar from "../../components/guide/GuideTabBar";
  import TouristTabBar from "../../components/tourist/TouristTabBar";

  export default {
    components: {TouristTabBar, GuideTabBar, DTabBar, Logo, DDatePicker},
    data () {
      return {
        tabs: [touristTabbarConfig.TOURIST_HOME, touristTabbarConfig.TOURIST_USER_CENTER],
        touristCurrent: TOURIST_HOME.name,
        guideCurrent: GUIDE_HOME.name
      }
    },
    mounted () {
      console.log("test", this.touristCurrent);
    },
    methods: {
      handleLocationChange (event) {
        console.log(event)
      },
      handleClick () {
        guide.queryOngoingOrdersGroupByDate(
          1,
          (res) => {
            console.log(res)
          },
          err => {
            console.log(err)
          }
        )
      }
    }
  }
</script>

<style>

</style>
