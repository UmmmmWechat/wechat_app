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
              <div v-if="result" style="'text-align': left; padding: 5rpx;">
                {{ result }}
              </div>
              <div v-else class="info">
                {{ prompt }}
              </div>
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
    prompt: {
      type: String,
      default: '未选择，点击开始选择'
    },
    start: {
      type: String
    },
    end: {
      type: String
    }
  },
  data () {
    return {
      componentName: "DDatePicker",
      result: undefined
    }
  },
  methods: {
    handleChange (event) {
      this.result = event.target.value;
      this.$emit('on-change', this.result);
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

