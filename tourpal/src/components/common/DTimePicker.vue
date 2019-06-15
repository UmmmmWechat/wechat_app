<!-- 时间选择器，包装原组件 -->
<!-- 事件有 on-change([hh,mm]) -->
<template>
  <div class="wrapper">
    <div class="label" v-if="label !== '' ">
      {{label}}
    </div>
    <div class="info">
      <!--<picker-->
        <!--mode="time"-->
        <!--:start="start"-->
        <!--:end="end"-->
        <!--@change="handleChange">-->
      <picker
        mode="time"
        @change="handleChange">
        <div v-if="result">
          {{ result }}
        </div>
        <div v-else>
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
        default: '选择时间'
      },
      prompt: {
        type: String,
        default: '未选择，点击开始选择'
      // },
      // start: {
      //   type: String,
      //   default: '08:00'
      // },
      // end: {
      //   type: String,
      //   default: '20:00'
      }
    },
    data () {
      return {
        componentName: 'DTimePicker',
        result: undefined
      }
    },
    methods: {
      handleChange (event) {
        this.result = event.target.value;
        this.$emit('on-change', this.result)
        // const result = event.target.value;
        // if (result >= this.start && result <= this.end) {
        //   this.result = result;
        //   this.$emit('on-change', this.result)
        // } else {
        //   // 输出提示信息
        //   wx.showToast({
        //     icon: 'none',
        //     title: `请选择 ${this.start} 到 ${this.end} 之间的时间`
        //   })
        // }
      }
    }
  }
</script>

<style scoped>
</style>

<style scoped src="../../assets/style/d-form-item.css"></style>

