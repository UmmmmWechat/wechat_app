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
        :type="'idcard'"
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
        :type="'number'"
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
  import DSelector from '../../components/common/DSelector'
  import DChooseSpots from '../../components/common/DChooseSpots'

  import guideApi from '../../api/guide'
  import {GUIDE_MAIN} from '../pages_url'
  import {SELECTED_SPOTS} from '../../api/const/guideConst'

  import {validIdcard, validTel} from '../../utils/dUtils'

  export default {
    components: {
      DInput,
      DTextarea,
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
      this.dLog('onShow 方法响应')
      this.refreshFavorSpots()
    },
    methods: {
      dLog (message, ...optionalParams) {
        console.log(this.pageName, message, optionalParams)
      },
      dError (message, ...optionalParams) {
        console.error(this.pageName, message, optionalParams)
      },
      showErrorToast (errMsg, ...fai) {
        this.dError(errMsg, fai)

        // 输出提示信息
        wx.showToast({
          icon: 'none',
          title: errMsg
        })
      },
      handleSexChange (event) {
        this.dLog('handleSexChange 方法响应', event)
        this.form.gender = event.target.value
      },
      refreshFavorSpots () {
        this.dLog('refreshFavorSpots 方法响应')
        this.form.favorSpots.splice(0, this.form.favorSpots.length)// 清空原 spot 数组

        this.form.favorSpots = wx.getStorageSync(SELECTED_SPOTS)
        if (!this.form.favorSpots) {
          this.dLog('没找到 favorSpots')
          this.form.favorSpots = []
        }
      },
      handleSubmit (event) {
        this.dLog('handleSubmit 方法响应', event, this.form)

        // 检查表单项
        let errMsg;
        if (!this.form.realName) {
          errMsg = '请输入你的真实姓名'
        } else if (!this.form.gender) {
          errMsg = '请输入你的性别'
        } else if (!this.form.wechat) {
          errMsg = '请输入你的微信号'
        } else if (!this.form.favorSpots || !this.form.favorSpots.length) {
          errMsg = '请输入你想负责的景点'
        } else if (!(this.form.idCard && validIdcard(this.form.idCard))) {
          errMsg = '请输入正确的身份证号'
        } else if (!(this.form.phone && validTel(this.form.phone))) {
          errMsg = '请输入正确的手机号'
        } else if (!(this.form.introduction && this.form.introduction.length <= 50)) {
          errMsg = '请简短地介绍下自己（50字以内）'
        }
        if (errMsg) {
          this.showErrorToast(errMsg)
          return;
        }

        // 发起注册请求
        guideApi.signUp(
          this.form,
          () => {
            const sucMsg = '成功注册'
            this.dLog(sucMsg)

            const url = `/${GUIDE_MAIN}`
            this.dLog('跳转', url)
            wx.redirectTo({url})

            // 输出提示信息
            wx.showToast({
              icon: 'none',
              title: sucMsg
            })

            // 清空选中的景点
            wx.removeStorage({
              key: SELECTED_SPOTS
            })
          },
          (err) => {
            this.showErrorToast(err)
          }
        )
      }
    }
  }
</script>

<style scoped>
  .item-wrapper {
    padding: 10px;
  }
</style>
