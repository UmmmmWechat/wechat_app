<!-- mini 邀请列表 用于日历页 -->
<template>
  <scroll-view
    id="scroll"
    scroll-with-animation
    enable-back-to-top
    scroll-y
    :style="{height: scrollHeight}">
    <div>
      <order-card-mini
        v-for="order in orders"
        :key="order.id"
        :order="order"/>
    </div>
  </scroll-view>
</template>

<script>
  import OrderCardMini from './OrderCardMini'

  export default {
    components: {
      OrderCardMini
    },
    props: {
      orders: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        scrollHeight: '100%'
      }
    },
    mounted () {
      if (this.orders.length > 4) {
        this.scrollHeight = this.orders.length * 160 + 'rpx'
      }
    }
  }
</script>

<style scoped>
</style>
