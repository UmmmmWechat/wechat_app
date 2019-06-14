<template>
    <DTabBar v-bind:tabs="tabs" v-bind:current="current"/>
</template>

<script>
    import {touristTabbarConfig} from "../../utils/TabbarConfig";
    import DTabBar from "../common/DTabBar";
    export default {
      name: "TouristTabBar",
      components: {DTabBar},
      props: {
        current: {
          type: String,
          default: () => ""
        }
      },
      data () {
        return {
          tabs: Object.values(touristTabbarConfig)
        }
      }
    }
</script>

<style scoped>

</style>
