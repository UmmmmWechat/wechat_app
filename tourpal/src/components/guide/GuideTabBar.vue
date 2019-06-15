<template>
    <DTabBar v-bind:tabs="tabs" v-bind:current="current"/>
</template>

<script>
    import DTabBar from "../common/DTabBar";
    import {guideTabbarConfig} from "../../utils/TabbarConfig";
    export default {
      name: "GuideTabBar",
      components: {DTabBar},
      props: {
        current: {
          type: String,
          default: () => ""
        }
      },
      data () {
        return {
          tabs: Object.values(guideTabbarConfig)
        }
      }
    }
</script>

<style scoped>

</style>
