<template>
  <div>
    <div class="item-wrapper">
      <d-input 
      :value="form.realName"
      placeholder="请输入你的真实姓名" 
      label="真实姓名"/>
    </div>
    <div class="item-wrapper">
      <d-input
      :value="form.idCard" 
      placeholder="用于实名登记检验" 
      label="身份证号"/>
    </div>
    <div class="item-wrapper">
      <d-selector 
      :range="gender"  
      label="性别"
      @on-change="handleSexChange"/>
    </div>
    <div class="item-wrapper">
        <d-choose-location
        label="选择地点"
        @on-location-chosen="handleLocationChosen"/>
    </div>
    <div class="item-wrapper">
      <d-input
      :value="form.wechat" 
      placeholder="用于游客联系" 
      label="微信号"/>
    </div>
    <div class="item-wrapper">
      <d-input
      :phone="form.phone" 
      placeholder="用于游客联系" 
      label="手机号"/>
    </div>
    <div class="item-wrapper">
      <button 
      type="primary"
      @click="handleSubmit">
      确定
      </button>
    </div>
  </div>
</template>

<script>
import DInput from '../../components/common/DInput'
import DChooseLocation from '../../components/common/DChooseLocation'
import DSelector from '../../components/common/DSelector'

import guideApi from '../../api/guide'

export default {
  components: {
    DInput,
    DChooseLocation,
    DSelector
  },
  data () {
    return {
      region: [],
      gender: ['男', '女'],
      form: {
        realName: '',
        idCard: '',
        gender: '',
        location: {},
        wechat: '',
        phone: ''
      }
    }
  },
  methods: {
    handleSexChange (event) {
      console.log(event);
      this.form.gender = event.target.value;
    },
    handleLocationChosen (event) {
      console.log(event);
      // this.location = event.target.value;
      this.form.location = event.target.value;
    },
    handleSubmit (event) {
      guideApi.signUp(
        this.form, 
        (res) => {
          console.log('成功注册')
          wx.redirectTo({
            url: '/pages/guide_main/main'
          })
        },
        (err) => {

        }
      )
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
