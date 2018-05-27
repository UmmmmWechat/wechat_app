/* 事件有 */
<template>
  <div id="wrapper">
      <div class="label" v-if="label !== '' ">
          {{label}}
      </div>
      <div id="input-wrapper">
            <div 
            class="info"
            @click="handleChooseSpots">
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
      },
      spots: {
          type: Array,
          required: true
      }
  },
  data () {
      return {
          
      }
  },
  computed: {
      info () {
          return this.spots.length === 0 ? '未选择，点击选择景点' : '已选择';
      }
  },
  methods: {
      handleChooseSpots (event) {
         wx.navigateTo({
             url: '/pages/select_spots/main'
         })
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
