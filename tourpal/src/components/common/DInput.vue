<!-- 输入框，包装原组件 -->
<!-- 事件有 on-enter input on-focus -->
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
        placeholder-style="color:rgba(0,0,0,0.3);"
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
        type: [String, Number]
      },
      label: {
        type: String,
        default: ''
      }
    },
    methods: {
      handleEnter (event) {
        this.$emit('on-enter', event)
      },
      handleInput (event) {
        this.$emit('input', event.target.value)
      },
      handleFocus (event) {
        this.$emit('on-focus', event)
      }
    }
  }
</script>

<style scoped>
  #wrapper {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  #input-wrapper {
    margin: 10px 0 0 0;
    border-bottom: 1px rgba(0, 0, 0, 0.2) solid;
    padding-bottom: 2px;
  }
</style>

<style scoped src="../../assets/style/d-form-item.css"></style>
