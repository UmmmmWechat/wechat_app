<template>
  <img v-bind:src="logo" v-bind:style="style">
</template>

<script>
  import logo from "../../assets/image/tourpal.png";
  export default {
    name: "Logo",
    props: {
      width: {
        type: Number,
        default: 540
      }
    },
    data () {
      return {
        logo: logo
      }
    },
    computed: {
      style () {
        return {
          width: this.width + "rpx",
          height: (this.width / 3 * 2) + "rpx"
        }
      }
    },
    mounted () {
      console.log("logo mounted")
    }
  }
</script>

<style scoped>

</style>
