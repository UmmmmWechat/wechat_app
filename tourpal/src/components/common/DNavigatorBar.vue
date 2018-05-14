<template>
  <div id="out">
      <span
      v-for="(menu, index) in menus"
      :key="index"
      class="menu-item"
      :class="{'current-menu':current === index}"
      @click="handleClickMenuItem($event, index)">
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
      handleClickMenuItem(event, index) {
          console.log(index);
          event.target.value = index;
          this.$emit('on-change', event);
      }
  }
}
</script>

<style scoped>
#out {

    padding: 10rpx;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.menu-item {
    padding-bottom: 10rpx;
}

.current-menu {
    border-bottom: #42b970 4px solid;
    color:  #42b970;
}
</style>
