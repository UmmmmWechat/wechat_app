<template>
  <div>
    <div class="wrapper" v-if="guide">

      <div class="head">
        <div>
          <img
            class="avatar"
            :src="guide.avatar"
            alt="头像加载失败"
          >
        </div>
        <div class="text">{{ guide.realName }}</div>
      </div>

      <div v-if="!editMode">
        <div class="info-item">
          <span class="title-span">微信号：</span>
          <span class="info-span">{{ guide.wechat }}</span>
        </div>
        <div class="info-item">
          <span class="title-span">手机号：</span>
          <span class="info-span">{{ guide.phone }}</span>
        </div>
        <div class="info-item">
          <span class="title-span">个人简介：</span>
          <span class="info-span">{{ guide.introduction }}</span>
        </div>
        <div class="info-item">
          <span class="title-span">负责景点：</span>
          <span class="info-span">{{ getSpotList }}</span>
        </div>
        <div class="info-item">
          <span class="title-span">好评度：</span>
          <span>
            <progress
              :percent="computedGoodRate"
              show-info/>
          </span>
        </div>
        <div class="info-wrapper button-wrapper">
          <button
            type="primary"
            @click="handleStartModify">
            修改信息
          </button>
        </div>
      </div>
    </div>

    <div v-if="editMode">
      <div class="item-wrapper">
        <d-input
          label="微信号"
          :placeholder="guide.wechat"
          confirm-type="search"
          @input="form.wechat = $event"/>
      </div>

      <div class="item-wrapper">
        <d-input
          label="手机号"
          :type="'number'"
          :placeholder="guide.phone"
          confirm-type="search"
          @input="form.phone = $event"/>
      </div>

      <div class="item-wrapper">
        <d-input
          label="个人简介"
          :placeholder="guide.introduction"
          confirm-type="search"
          @input="form.introduction = $event"/>
      </div>

      <div class="item-wrapper">
        <d-choose-spots
          label="负责景点"
          :spots="form.favorSpots"/>
      </div>

      <div class="item-wrapper button-wrapper">
        <button
          type="primary"
          @click="handleSubmit">
          提交
        </button>
      </div>

      <div class="item-wrapper button-wrapper">
        <button
          open-type="getUserInfo"
          @getuserinfo="handleGetUserInfo">
          授权头像信息并提交
        </button>
      </div>
    </div>

  </div>
</template>

<script>
  import DInput from '../../components/common/DInput'
  import DTextArea from '../../components/common/DTextarea'
  import DChooseSpots from '../../components/common/DChooseSpots'

  import guideApi from '../../api/guide'
  import {GUIDE_INFO, SELECTED_SPOTS} from '../../api/const/guideConst'
  import {validTel} from '../../utils/dUtils'

  export default {
    components: {
      DInput,
      DTextArea,
      DChooseSpots
    },
    data () {
      return {
        editMode: false,
        guide: undefined,
        form: {
          wechat: '',
          phone: '',
          introduction: '',
          favorSpots: []
        },
        pageName: 'guide_center_info',
        hasCheck: false
      }
    },
    mounted () {
      // 取得导游信息
      this.guide = wx.getStorageSync(GUIDE_INFO)
      if (!this.guide) {
        // 未取得导游信息
        const errMsg = '粗错啦QWQ没找到你的导游信息'

        // 跳回
        wx.navigateBack()

        // 显示错误信息
        this.showErrorToast(errMsg)

        return
      }

      // 初始化信息
      this.editMode = false
      this.hasCheck = false
      this.form = {
        wechat: this.guide.wechat,
        phone: this.guide.phone,
        introduction: this.guide.introduction,
        favorSpots: [...this.guide.favorSpots]
      }

      // 保存景点信息
      wx.setStorageSync(SELECTED_SPOTS, this.guide.favorSpots)
    },
    onShow () {
      if (this.editMode) {
        // 编辑模式更新负责景点
        this.dLog('编辑模式更新景点信息')
        this.form.favorSpots = wx.getStorageSync(SELECTED_SPOTS)
      }
    },
    computed: {
      computedGoodRate () {
        return this.guide ? Math.round(this.guide.goodFeedbackRate) : 0
      },
      getSpotList () {
        if (!this.guide || this.guide.favorSpots.length === 0) {
          return '未选择，点击选择景点'
        } else {
          return this.guide.favorSpots.map(
            (spot) => spot.name
          ).join(',')
        }
      }
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
      handleStartModify (event) {
        this.dLog('修改信息', event)
        this.form.favorSpots = wx.getStorageSync(SELECTED_SPOTS)
        this.editMode = true
      },
      handleSubmit (event) {
        this.dLog('修改提交', event)

        if (!this.hasCheck) {
          if (!this.checkModify()) {
            this.dLog('修改非法')
            return
          }
        }

        guideApi.modifyUserInfo(
          this.guide,
          (res) => {
            const sucMsg = '修改成功'
            this.dLog('修改成功', res)

            // 取得景点信息
            this.guide.favorSpots = wx.getStorageSync(SELECTED_SPOTS)

            wx.setStorage({
              key: GUIDE_INFO,
              data: this.guide,
              success: () => {
                this.editMode = false

                // 输出提示信息
                wx.showToast({
                  icon: 'none',
                  title: sucMsg
                })
              }
            })
          },
          (rej) => {
            const errMsg = '修改失败'
            this.showErrorToast(errMsg, rej)
          }
        )
      },
      handleGetUserInfo (event) {
        this.dLog('handleGetUserInfo 方法调用', event)

        if (this.checkModify()) {
          // 修改合法
          this.guide.avatar = event.target.userInfo.avatarUrl

          this.handleSubmit(event)
        }
      },
      checkModify () {
        this.hasCheck = false
        this.dLog('checkModify 方法调用', this.form)

        // 检查表单项
        let errMsg;
        if (!this.form.wechat) {
          errMsg = '请输入你的微信号'
        } else if (!this.form.favorSpots || !this.form.favorSpots.length) {
          errMsg = '请输入你想负责的景点'
        } else if (!(this.form.phone && validTel(this.form.phone))) {
          errMsg = '请输入正确的手机号'
        } else if (!(this.form.introduction && this.form.introduction.length <= 50)) {
          errMsg = '请简短地介绍下自己（50字以内）'
        }
        if (errMsg) {
          this.showErrorToast(errMsg)
          return;
        }

        // 保存修改信息
        this.guide.favorSpots = wx.getStorageSync(SELECTED_SPOTS)

        if (this.form.wechat) {
          this.guide.wechat = this.form.wechat
        }

        if (this.form.phone) {
          this.guide.phone = this.form.phone
        }
        if (this.form.introduction) {
          this.guide.introduction = this.form.introduction
        }

        this.hasCheck = true

        return true
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .head {
    margin-bottom: 20px;
  }

  .wrapper, .text {
    padding: 20px;
  }

  .avatar {
    margin: 20px;
    height: 200px;
    width: 200px;
    border-radius: 50%;
  }

  .info-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    text-align: left;
  }

  .info-item, .item-wrapper {
    padding: 10px;
  }

  .button-wrapper {
    margin-top: 50px;
  }

  .title-span {
    font-weight: bold;
    width: 190px;
  }

  .info-span, progress {
    width: 500px;
  }
</style>
