<template>
  <div class="bar__wrapper">
    <!--    <div>test</div>-->
    <div class="bar__tab-item" v-for="(item, index) in tabs" v-bind:key="index">
      <template v-if="current === item.name">
        <img v-bind:src="item.selectedIcon" class="bar__tab-icon"/>
        <span class="bar__tab-label bar__tab-label--selected">{{item.label}}</span>
      </template>
      <template v-else>
        <img v-bind:src="item.icon" class="bar__tab-icon" v-on:click="handleClickLink(item.path)"/>
        <span class="bar__tab-label">{{item.label}}</span>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DTabBar",
    mounted () {
      console.log("tabs", this.tabs);
      console.log("current", this.current)
    },
    props: {
      tabs: {
        type: Array,
        default: () => []
      },
      current: {
        type: String,
        default: () => ""
      }
    },
    methods: {
      handleClickLink (link) {
        console.log(link);
        wx.redirectTo({
          url: link
        })
      }
    }
  }
</script>

<style scoped>
  .bar__wrapper {
    background-color: white;

    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;

    border-top: rgba(0,0,0,0.05) 1Px solid;
    padding: 4px;
    padding-top: 10px;
  }

  .bar__tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .bar__tab-icon {
    width: 32Px;
    height: 32Px;
  }

  .bar__tab-label {
    color: #aaaaaa;
    font-size: 12Px;
  }

  .bar__tab-label--selected {
    color: #42b970;
  }
</style>
