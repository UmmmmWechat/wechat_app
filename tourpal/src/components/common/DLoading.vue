/* 加载中的波浪条组件 */
<template>
  <div id="out" :style="{display:loading ? 'block' : 'none'}">
        <div class="item" id="rect1" :style="{backgroundColor: color}"></div>
        <div class="item" id="rect2" :style="{backgroundColor: color}"></div>
        <div class="item" id="rect3" :style="{backgroundColor: color}"></div>
        <div class="item" id="rect4" :style="{backgroundColor: color}"></div>
        <div class="item" id="rect5" :style="{backgroundColor: color}"></div>
  </div>
</template>

<script>
export default {
 props: {
     loading: {
         type: Boolean,
         default: true
     },
     color: {
         type: String,
         default:'#42b970'
     }
 }
}
</script>

<style scoped>
#out {
    text-align: center;
    margin: 10rpx;
}

.item {
    display: inline-block;
    margin: 0 2px;
    width: 4px;
    height: 20px;

    animation: scaledelay 1.2s infinite ease-in-out;
}

@keyframes scaledelay {
  0%, 40%, 100% { transform: scaleY(0.4); }  
  20% { transform: scaleY(1.0); }
}

#rect1 { animation-delay: -1.1s; }
#rect2 { animation-delay: -1.0s; }
#rect3 { animation-delay: -0.9s; }
#rect4 { animation-delay: -0.8s; }
#rect5 { animation-delay: -0.7s; }
</style>
