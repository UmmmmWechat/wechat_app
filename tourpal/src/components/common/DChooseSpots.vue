<!-- 选择景点组件，显示已选择的景点 -->
<template>
  <div id="wrapper">
    <div class="label" v-if="label">
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
  import {SELECT_SPOTS} from '../../pages/pages_url'

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
    computed: {
      info () {
        if (this.spots.length === 0) {
          return '未选择，点击选择景点'
        } else {
          return this.spots
            .map((spot) => spot.name)
            .join(',')
        }
      }
    },
    methods: {
      handleChooseSpots () {
        const url = `/${SELECT_SPOTS}`
        console.log('DchooseSpots 跳转', url)
        wx.navigateTo({url})
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
