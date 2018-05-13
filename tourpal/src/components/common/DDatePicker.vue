/* 日期选择器，包装原组件 */
/* 事件有 on-change */
<template>
  <div id="wrapper">
      <div class="label" v-if="label !== '' ">
          {{label}}
      </div>
      <div id="input-wrapper">
          <picker 
          mode="date"
          :start="start"
          :end="end"
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
      start: {
          type: String,
          default: '1900-01-01'
      },
      end: {
          type: String,
          default: '2020-01-01'
      }
  },
  data () {
      return {
          result: '未选择，点击开始选择'
      }
  },
  methods: {
      handleChange (event) {
          console.log(event);
          this.result = event.target.value;
          this.$emit('on-change', event);
      }
  }
}
</script>


<style scoped>
#wrapper {
    display: flex;
    flex-direction: column;
    padding: 20rpx;
}
</style>

<style scoped src="../../assets/style/d-form-item.css"/>

