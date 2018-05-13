/* 输入框，包装原组件 */
/* 事件有 on-enter input  on-focus */
<template>
  <div id="wrapper">
      <label
      for="d-input" 
      class="label" 
      v-if="label !== '' ">
          {{label}}
      </label>
      <div id="input-wrapper">
          <input
          id="d-input"
            :value="value"
            :placeholder="placeholder"
            @confirm="handleEnter"
            @input="handleInput"
            @focus="handleFocus"/>
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
          console.log('on-enter');
          this.$emit('on-enter', event);
      },
      handleInput (event) {
          this.$emit('input',event.target.value);
      },
      handleFocus (event) {
          this.$emit('on-focus', event);
      },
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
