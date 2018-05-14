/* 邀请列表，装载一项项的邀请， 用type区分是tourist 还是 guide */

<template>
  <scroll-view
  id="scroll"
  scroll-with-animation
  enable-back-to-top
  scroll-y
  :style="{height: (orders.length > 4 ? 1200 : orders.length * 300) + 'rpx'}">
      <div v-if="type === 'tourist' ">
          <order-card-tourist 
            v-for="order in orders"
            :key="order.id"
            :order="order"/>
      </div>
      <div v-else>
          <order-card-guide 
            v-for="order in orders"
            :key="order.id"
            :order="order"/>
      </div>
  </scroll-view>
</template>

<script>
import OrderCardTourist from './OrderCardTourist';
import OrderCardGuide from './OrderCardGuide';
export default {
    components: {
        OrderCardTourist,
        OrderCardGuide
    },
    props: {
        orders: {
            type: Array,
            required: true
        },
        type: {
            type: String,
            validator (value) {
                return ['tourist', 'guide'].indexOf(value) !== -1;
            },
            default: 'tourist'
        }
    },

}
</script>

<style scoped>
</style>
