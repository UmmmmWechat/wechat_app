<template>
  <div>
    <div class="item-wrapper">
      <d-input 
        placeholder="请输入你的真实姓名" 
        label="真实姓名"
        @input="form.realName = $event"/>
    </div>

    <div class="item-wrapper">
      <d-input
      placeholder="用于实名登记检验" 
      label="身份证号"
      @input="form.idCard = $event"/>
    </div>

    <div class="item-wrapper">
      <d-selector 
      :range="gender"  
      label="性别"
      @on-change="handleSexChange"/>
    </div>

    <div class="item-wrapper">
      <d-choose-spots
      label="负责景点"
      :spots="form.favorSpots"/>
    </div>

    <div class="item-wrapper">
      <d-input
        placeholder="用于游客联系" 
        label="微信号"
        @input="form.wechat = $event"/>
    </div>

    <div class="item-wrapper">
      <d-input
        placeholder="用于游客联系" 
        label="手机号"
        @input="form.phone = $event"/>
    </div>

    <div class="item-wrapper">
      <d-textarea
        placeholder="请简短地介绍下自己" 
        label="自我介绍"
        @input="form.introduction = $event"/>
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
import DTextarea from '../../components/common/DTextarea'
import DChooseLocation from '../../components/common/DChooseLocation'
import DSelector from '../../components/common/DSelector'
import DChooseSpots from '../../components/common/DChooseSpots'

import guideApi from '../../api/guide'
import { GUIDE_MAIN } from '../pages_url';
import { SELECTED_SPOTS } from '../../api/const/guideConst';

export default {
  components: {
    DInput,
    DTextarea,
    DChooseLocation,
    DChooseSpots,
    DSelector
  },
  data () {
    return {
      gender: ['男', '女'],
      form: {
        realName: '',
        idCard: '',
        gender: '',
        favorSpots: [],
        wechat: '',
        phone: '',
        introduction: ''
      },
      pageName: 'guide_sign_up'
    }
  },
  onShow () {
    this.dLog("onShow 方法响应");
    this.refreshFavorSpots();
  },
  methods: {
    dLog(message, ...optionalParams) {
        console.log(this.pageName, message, optionalParams);
    },
    dError(message, ...optionalParams) {
        console.error(this.pageName, message, optionalParams);
    },
    showErrorToast(errMsg, ...fai) {
      this.dError(errMsg, fai);
      
      // 输出提示信息 
      wx.showToast({
          icon: 'none',
          title: errMsg
      });
    },
    handleSexChange (event) {
      this.dLog("handleSexChange 方法响应", event);
      this.form.gender = event.target.value;
    },
    refreshFavorSpots() {
      this.dLog("refreshFavorSpots 方法响应");
      this.form.favorSpots.splice(0, this.form.favorSpots.length);// 清空原 spot 数组

      this.form.favorSpots = wx.getStorageSync(SELECTED_SPOTS);
      if (!this.form.favorSpots) {
        this.dLog("没找到 favorSpots");
        this.form.favorSpots = [];
      }
    },
    handleSubmit (event) {
      this.dLog("handleSubmit 方法响应", event, this.form);

      // 检查表单项
      if (!this.form.realName) {
        const errMsg = "请输请输入你的真实姓名"
        this.showErrorToast(errMsg);
        return;
      } else if (!this.form.idCard) {
        const errMsg = "请输请输入你的身份证号"
        this.showErrorToast(errMsg);
        return;
      } else if (!this.form.gender) {
        const errMsg = "请输请输入你的性别"
        this.showErrorToast(errMsg);
        return;
      } else if (!this.form.favorSpots) {
        const errMsg = "请输请输入你想负责的景点"
        this.showErrorToast(errMsg);
        return;
      } else if (!this.form.wechat) {
        const errMsg = "请输请输入你的微信号"
        this.showErrorToast(errMsg);
        return;
      } else if (!this.form.phone) {
        const errMsg = "请输请输入你的手机号"
        this.showErrorToast(errMsg);
        return;
      } else if (!this.form.introduction) {
        const errMsg = "请简短地介绍下自己"
        this.showErrorToast(errMsg);
        return;
      }

      // 发起注册请求
      guideApi.signUp(
        this.form, 
        (res) => {
          const sucMsg = "成功注册"
          this.dLog(sucMsg);

          const url = `/${GUIDE_MAIN}`;
          this.dLog('跳转', url);
          wx.switchTab({ url });

          // 输出提示信息 
          wx.showToast({
              icon: 'none',
              title: sucMsg
          });

          // 清空选中的景点
          wx.removeStorage({
            key: SELECTED_SPOTS
          })
        },
        (err) => {
          this.showErrorToast(err);
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
