<template>
  <scroll-view
  id="scroll"
  scroll-with-animation
  enable-back-to-top
  scroll-y
  :style="{height: (orders.length > 4 ? 1200 : orders.length * 300) + 'rpx'}">
      <order-card-tourist 
      v-for="order in orders"
      :key="order.id"
      :order="order"/>
  </scroll-view>
</template>

<script>
import OrderCardTourist from './OrderCardTourist';
export default {
    components: {
        OrderCardTourist
    },
    props: {
        orders: {
            type: Array,
            require: true
        }
    },

}
</script>

<style scoped>
</style>
