<template>
  <div>
    <div class="item-wrapper">
      <d-input placeholder="请输入你的真实姓名" label="真实姓名"/>
    </div>
    <div class="item-wrapper">
      <d-input placeholder="用于实名登记检验" label="身份证号"/>
    </div>
    <div class="item-wrapper">
      <d-selector 
      :range="sex"  
      label="性别"
      @on-change="handleSexChange"/>
    </div>
    <div class="item-wrapper">
        <d-choose-location
        label="选择地点"
        @on-location-chosen="handleLocationChosen"/>
    </div>
    <div class="item-wrapper">
      <d-input placeholder="用于游客联系" label="微信号"/>
    </div>
    <div class="item-wrapper">
      <d-input placeholder="用于游客联系" label="手机号"/>
    </div>
  </div>
</template>

<script>
import DInput from '../../components/common/DInput'
import DChooseLocation from '../../components/common/DChooseLocation'
import DSelector from '../../components/common/DSelector'
export default {
  components: {
    DInput,
    DChooseLocation,
    DSelector
  },
  data () {
    return {
      region: [],
      location: {},
      sex: ['男', '女']
    }
  },
  methods: {
    handleSexChange (event) {
      console.log(event);
    },
    handleLocationChosen (event) {
      console.log(event);
      this.location = event.target.value;
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
