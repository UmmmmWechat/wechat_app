<!-- 包装了一下微信原装组件 -->
<!-- 事件有 on-change on-cancel on-location-chosen(调用微信地图选点之后) -->
<!-- TODO 疑似未用到 可丢弃 并没有 on-change on-cancel -->
<template>
  <div id="wrapper">
    <div class="label" v-if="label !== '' ">
      {{label}}
    </div>
    <div id="input-wrapper">
      <div
        class="info"
        @click="handleChooseLocation">
        {{ info }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        info: '未选择，点击打开地图选点'
      }
    },
    methods: {
      handleChooseLocation (event) {
        wx.chooseLocation({
          success: (res) => {
            console.log(res)
            this.info = res.name
            event.target.value = {
              name: res.name,
              address: res.address,
              latitude: res.latitude,
              longitude: res.longitude
            }
            this.$emit('on-location-chosen', event)
          }
        })
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
