/* 邀请列表，装载一项项的邀请， 用type区分是tourist 还是 guide */
<template>
<scroll-view
    class="scroll" 
    scroll-with-animation
    enable-back-to-top
    scroll-y
    :scroll-top="scrollTop"
    @scroll="handleScroll"
    @scrolltolower="handleScrolltolower">
    <div v-if="type === 'tourist' ">
        <order-card-tourist 
        v-for="order in orders"
        :color="color"
        :key="order.id"
        :order="order"/>
        <d-loading :loading="loading" :color="color" />
        <d-no-more :has-more="hasMore" :color="color"/>
        <d-no-more :has-more="!hasMore || orders.length || loading || firstSearch" :color="color"/>
    </div>
    <div v-else>
        <order-card-guide 
        v-for="order in orders"
        :color="color"
        :key="order.id"
        :order="order"/>
    </div>

    <section class="to-top-wrapper" v-if="show_gotop">
        <span id="to-top" @click="scrollToTop">
            Top
        </span>
    </section>
</scroll-view>
</template>

<script>
import OrderCardTourist from './OrderCardTourist';
import OrderCardGuide from './OrderCardGuide';
import DNoMore from '../common/DNoMore';
import DLoading from '../common/DLoading';

const SHOW_TOP_SCROLLTOP = 700;

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
                return ['tourist', 'guide'].indexOf(value) !== -1;
            },
            default: 'tourist'
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
    data() {
        return {
            scrollTop: undefined,
            show_gotop: false,
            componentName: "OrderList"
        }
    },
    mounted() {
        this.scrollToTop();
    },
    methods: {
        dLog(message, ...optionalParams) {
            console.log(this.componentName, message, optionalParams);
        },
        handleScroll(event) {
            // this.dLog("handleScroll 响应");

            var top = event.mp.detail.scrollTop;

            if (top > SHOW_TOP_SCROLLTOP) {
                if (!this.show_gotop) {
                    this.dLog("显示 gotop 浮标", top);
                    this.show_gotop = true;
                }
            } else {
                if (this.show_gotop) {
                    this.dLog("隐藏 gotop 浮标", top);
                    this.show_gotop = false;
                }
            }
        },
        scrollToTop() {
            this.dLog("scrollToTop 方法调用");

            this.show_gotop = false;

            this.scrollTop = 0;
            setTimeout(
                () => {
                this.scrollTop = undefined;
                }, 500
            );
        },
        handleScrolltolower(event) {
            this.$emit("scrolltolower", event);
        }
    }
}
</script>

<style scoped>
.scroll {
  height: 1000rpx;
}

.to-top-wrapper {
  position: fixed;
  left: 5%;
  bottom: 10%;
  opacity: 0.7;
}

#to-top {
  height: 100rpx;
  width: 100rpx;
  border-radius: 50%;
  border: solid #42b970;
  box-shadow: #42b970 0 0 5px;
  background: #a2ddb9;
  
  color: #314237af;
  font-weight: bold;

  display: flex;
  flex-direction: column;
  align-items: center;/*垂直居中*/
  justify-content: center;/*水平居中*/
}
</style>
