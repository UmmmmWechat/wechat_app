<!-- 邀请列表，装载一项项的邀请， 用type区分是tourist 还是 guide
可监听的事件有
this.$emit('scrolltoupper', event)
this.$emit('scrolltolower', event)
this.$emit('on-cancel', orderId)
-->
<template>
  <scroll-view
    v-if="finishedLoading"
    class="scroll"
    scroll-with-animation
    enable-back-to-top
    scroll-y
    :style="scrollStyle"
    :scroll-top="scrollTop"
    @scrolltoupper="handleScrolltoUpper"
    @scrolltolower="handleScrolltolower">
    <div v-if="type === 'tourist' ">
      <order-card-tourist
        v-for="order in orders"
        :color="color"
        :key="order.id"
        :order="order"
        @on-cancel="handleOnCancel"/>
      <d-loading :loading="loading" :color="color"/>
      <d-no-more :has-more="hasMore" :color="color"/>
      <!--TODO 不明-->
      <!--<d-no-more :has-more="!hasMore || orders.length || loading || firstSearch" :color="color"/>-->
    </div>
    <div v-else>
      <order-card-guide
        v-for="order in orders"
        :color="color"
        :key="order.id"
        :order="order"
        @on-accept="handleOnAccept"
        @on-reject="handleOnReject"
        @on-cancel="handleOnCancel"/>
      <d-loading :loading="loading" :color="color"/>
      <d-no-more :has-more="hasMore" :color="color"/>
      <!--TODO 不明-->
      <!--<d-no-more :has-more="!hasMore || orders.length || loading || firstSearch" :color="color"/>-->
    </div>
  </scroll-view>
</template>

<script>
  import OrderCardTourist from './OrderCardTourist'
  import OrderCardGuide from './OrderCardGuide'
  import DNoMore from '../common/DNoMore'
  import DLoading from '../common/DLoading'
  import {TOURIST_TYPE, GUIDE_TYPE} from '../../api/const/orderConst'
  import {WINDOW_HEIGHT} from '../../api/const/commonConst'

  export default {
    components: {
      OrderCardTourist,
      OrderCardGuide,
      DNoMore,
      DLoading
    },
    props: {
      orders: {
        type: Array,
        required: true
      },
      type: {
        type: String,
        validator (value) {
          return [TOURIST_TYPE, GUIDE_TYPE].indexOf(value) !== -1
        },
        default: TOURIST_TYPE
      },
      color: {
        type: String
      },
      loading: {
        type: Boolean,
        default: false,
        required: true
      },
      hasMore: {
        type: Boolean,
        default: true,
        required: true
      },
      firstSearch: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        scrollTop: undefined,

        finishedLoading: false,
        componentName: 'OrderList',
        scrollHeight: 500
      }
    },
    computed: {
      scrollStyle () {
        return 'height: ' + this.scrollHeight + 'px;'
      }
    },
    mounted () {
      this.finishedLoading = false
      this.scrollHeight = wx.getStorageSync(WINDOW_HEIGHT)
      console.log(this.scrollHeight)

      this.scrollToTop()
      this.finishedLoading = true
    },
    methods: {
      dLog (message, ...optionalParams) {
        console.log(this.componentName, message, optionalParams)
      },
      scrollToTop () {
        this.dLog('scrollToTop 方法调用')

        this.scrollTop = 0
        setTimeout(
          () => {
            this.scrollTop = undefined
          }, 500
        )
      },
      handleScrolltoUpper (event) {
        this.$emit('scrolltoupper', event)
      },
      handleScrolltolower (event) {
        this.$emit('scrolltolower', event)
      },
      handleOnCancel (orderId) {
        this.$emit('on-cancel', orderId)
      },
      handleOnReject (orderId) {
        this.$emit('on-reject', orderId)
      },
      handleOnAccept (orderId) {
        this.$emit('on-accept', orderId)
      }
    }
  }
</script>

<style scoped>
</style>
