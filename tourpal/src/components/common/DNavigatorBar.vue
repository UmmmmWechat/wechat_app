<!-- 导航条 -->
<!-- 事件有 on-change -->
<template>
  <div id="out">
      <span
        v-for="(menu, index) in menus"
        :key="index"
        class="menu-item"
        :class="{'current-menu':current === index}"
        @click="handleClickMenuItem(index)">
        {{ menu }}
      </span>
  </div>
</template>

<script>
  export default {
    props: {
      menus: {
        type: Array,
        required: true
      },
      current: {
        type: Number,
        default: 0
      }
    },
    methods: {
      handleClickMenuItem (index) {
        this.$emit('on-change', index)
      }
    }
  }
</script>

<style scoped>
  #out {
    padding: 10px;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .menu-item {
    padding-bottom: 10px;
  }

  .current-menu {
    border-bottom: #42b970 4px solid;
    color: #42b970;
  }
</style>
