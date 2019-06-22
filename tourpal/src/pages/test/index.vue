<template>
  <div>
    <DCalendar/>
    <button @click="handleClick">测试</button>
    <Logo/>
    <div>
      <DRating v-bind:rating="3"/>
    </div>
<!--    <DTabBar v-bind:tabs="tabs" v-bind:current="current"/>-->
<!--    <GuideTabBar v-bind:current="guideCurrent"/>-->
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
  import DCalendar from "../../components/common/DCalendar";
  import DRating from "../../components/common/DRating";

  export default {
    components: {DCalendar, TouristTabBar, GuideTabBar, DTabBar, Logo, DDatePicker, DRating},
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
