<template>
  <div>
    <div class="item-wrapper">
      <d-input placeholder="请输入你的真实姓名" label="真实姓名"/>
    </div>
    <div class="item-wrapper">
      <d-input placeholder="用于实名登记检验" label="身份证号"/>
    </div>
    <div class="item-wrapper">
        <d-region-picker 
        label="选择地区" 
        :value="region"
        @on-change="handleChange"
        @on-cancel="handleCancel"/>
    </div>
    
  </div>
</template>

<script>
import DInput from '../../components/common/DInput'
import DRegionPicker from '../../components/common/DRegionPicker'
export default {
  components: {
    DInput,
    DRegionPicker
  },
  data () {
    return {
      region: []
    }
  },
  methods: {
    handleChange (event) {
      console.log(event);
    },
    handleCancel (event) {
      console.log(event);
    }
  }
}
</script>

<style scoped>
.item-wrapper {
  padding: 10rpx;
  /* margin: 10rpx; */
}
.title {
  font-weight: bold;
  text-align: left;
}
</style>
