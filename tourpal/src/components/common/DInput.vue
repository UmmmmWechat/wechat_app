/* 输入框，包装原组件 */
/* 事件有 on-enter input */
<template>
  <div id="wrapper">
      <div class="label" v-if="label !== '' ">
          {{label}}
      </div>
      <div id="input-wrapper">
          <input
            :value="value"
            :placeholder="placeholder"
            @keyup.enter="handleEnter"
            @input="handleInput"/>
      </div>
  </div>
</template>


<script>
export default {
  props: {
      placeholder: {
          type: String,
          default: ''
      },
      value: {
          type: [String,Number],
          default: ''
      },
      label: {
          type: String,
          default: ''
      }
  },
  methods: {
      handleEnter (event) {
          this.$emit('on-enter', event);
      },
      handleInput (event) {
          this.$emit('input', event);
      }
  }
}
</script>

<style scoped>
#wrapper {
    display: flex;
    flex-direction: column;
    padding: 20rpx;
    /* margin: 10rpx; */
    /* box-shadow: rgba(0,0,0,0.1) 0 0 2px; */

}
#input-wrapper {
    margin: 10rpx 0 0 0;
    border-bottom: 1px rgba(0,0,0,0.2) solid;
    padding-bottom: 2rpx;
}
</style>

<style scoped src="../../assets/style/d-form-item.css"/>
