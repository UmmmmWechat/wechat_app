<!-- 选择器，包装原组件 -->
<!-- 事件有 on-change -->
<template>
  <div id="wrapper">
    <div class="label" v-if="label !== '' ">
      {{label}}
    </div>
    <div id="input-wrapper">
      <picker
        mode="selector"
        :range="range"
        @change="handleChange">
        <div class="info">{{result}}</div>
      </picker>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        default: ''
      },
      range: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        result: '未选择，点击开始选择'
      }
    },
    methods: {
      handleChange (event) {
        console.log(event)
        this.result = this.range[event.target.value]
        event.target.value = this.result
        this.$emit('on-change', event)
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
</style>

<style scoped src="../../assets/style/d-form-item.css"></style>

