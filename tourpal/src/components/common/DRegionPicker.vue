/* 省份选择器，包装了一下微信原装组件 */
/* 事件有 on-change on-cancel */
<template>
  <div id="wrapper">
      <div id="label" v-if="label !== '' ">
          {{label}}
      </div>
      <div id="input-wrapper">
          <picker
            mode="region"
            :value="value"
            @change="handleChange"
            @cancel="handleCancel">
            <button>{{ info }}</button>
          </picker>
      </div>
  </div>
</template>


<script>
export default {
  props: {
      value: {
          type: Array,
          default: []
      },
      label: {
          type: String,
          default: ''
      }
  },
  data () {
      return {
          info: '点击选择地区'
      }
  },
  methods: {
      handleChange (event) {
          console.log('on-change in d-region-picker');
          this.info = '';
          const results = event.target.value;
          for (let i in results) {
              this.info += results[i] + ' ';
          }
          this.$emit('on-change', event);
      },
      handleCancel (event) {
          console.log('on-cancel in d-region-picker');
          this.$emit('on-cancel', event);
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
#label {
    width: 100%;
    color: gray;
    font-weight: bold;
}
#input-wrapper {
    margin: 10rpx;
    padding-bottom: 2rpx;
}
</style>
