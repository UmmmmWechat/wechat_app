/* 加载中的波浪条组件 */
<template>
  <div id="out" :style="{display:loading ? 'block' : 'none'}">
      <div class="item" id="rect1"></div>
      <div class="item" id="rect2"></div>
      <div class="item" id="rect3"></div>
      <div class="item" id="rect4"></div>
      <div class="item" id="rect5"></div>
  </div>
</template>

<script>
export default {
 props: {
     loading: {
         type: Boolean,
         default: true
     }
 }
}
</script>


<style scoped>
#out {
    text-align: center;
    margin: 2px;
}
.item {
    display: inline-block;
    margin: 0 2px;
    background-color: #42b970;
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
