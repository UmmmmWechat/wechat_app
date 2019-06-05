<template>
  <div id="out">
    <div id="profile-wrapper">
      <guide-profile-card
        :canInvite="false"
        :guide="guide"/>
    </div>

    <div id="form-wrapper">
      <form
        report-submit
        @submit="handleSubmit">
        <d-titled-text
          title="旅游地点"
          :text="spotName"/>

        <d-date-picker
          label="旅游日期"
          prompt="可预约四周内的时间"
          :start="start"
          :end="end"
          @on-change="handleDateChanged"
        />

        <d-time-picker
          label="旅游时间"
          prompt="可预约早晚八点之间的时间"
          @on-change="handleTimeChanged"
        />

        <d-textarea
          label="留言"
          placeholder="请给向导留个言吧"
          @input="handleInput"/>

        <button
          formType="submit"
          type="primary"
          class="confirm-btn-wrapper">
          确定
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import GuideProfileCard from '../../components/guide/GuideProfileCard'
  import DTextarea from '../../components/common/DTextarea'
  import DTitledText from '../../components/common/DTitledText'
  import DDatePicker from '../../components/common/DDatePicker'
  import DTimePicker from '../../components/common/DTimePicker'

  import touristApi from '../../api/tourist'

  import {mockGuide} from '../../api/mock/guide_mock_data'
  import {INVITE_GUIDE_INFO} from '../../api/const/guideConst'
  import {formatDate} from '../../utils/dUtils'
  import {D_SPOT_ID, D_SPOT_NAME} from '../../api/const/spotConst'
  import {TOURIST_ID} from '../../api/const/touristConst'

  export default {
    components: {
      DTimePicker,
      GuideProfileCard,
      DTextarea,
      DTitledText,
      DDatePicker
    },
    data () {
      return {
        guide: mockGuide,

        start: '1900-01-01',
        end: '2200-01-01',

        // form相关
        spotId: 'spotId',
        spotName: 'spotName',
        touristId: 'touristId',
        travelDate: undefined,
        travelTime: undefined,
        message: undefined,

        pageName: 'tourist_invite_guide'
      }
    },
    mounted () {
      // TODO 取得 向导信息 多个向导
      this.guide = wx.getStorageSync(INVITE_GUIDE_INFO)
      if (!this.guide) {
        const errMsg = '向导信息获取失败'
        this.mountedError(errMsg)
        return
      }

      // 取得 景点ID
      this.spotId = wx.getStorageSync(D_SPOT_ID)
      if (!this.spotId) {
        const errMsg = '取得景点ID失败'
        this.mountedError(errMsg)
        return
      }

      // 取得 景点名称
      this.spotName = wx.getStorageSync(D_SPOT_NAME)
      if (!this.spotName) {
        const errMsg = '取得景点名称失败'
        this.mountedError(errMsg)
        return
      }

      // 取得 游客ID
      this.touristId = wx.getStorageSync(TOURIST_ID)
      if (!this.touristId) {
        const errMsg = '取得游客ID失败'
        this.mountedError(errMsg)
        return
      }

      // 设置时间区间
      let startDate = new Date()
      let endDate = new Date()
      endDate.setDate(startDate.getDate() + 28)
      this.start = formatDate(startDate)
      this.end = formatDate(endDate)
    },
    methods: {
      dLog (message, ...optionalParams) {
        console.log(this.pageName, message, optionalParams)
      },
      dError (message, ...optionalParams) {
        console.error(this.pageName, message, optionalParams)
      },
      mountedError (errMsg) {
        this.dError(errMsg)

        wx.navigateBack()

        // 输出提示信息
        wx.showToast({
          icon: 'none',
          title: errMsg
        })
      },
      handleDateChanged (date) {
        this.dLog('handleDateChanged 方法调用', date)
        this.travelDate = date
      },
      handleTimeChanged (time) {
        this.dLog('handleTimeChanged 方法调用', time)
        this.travelTime = time
        this.dLog(`travelDate 更新 ${this.travelDate}`)
      },
      handleInput (e) {
        this.dLog('handleInput 方法调用', e)
        this.message = e
        this.dLog(`message 更新 ${this.message}`)
      },
      handleSubmit (e) {
        this.dLog('handleSubmit 方法调用', e)

        // 获取formId
        const formId = e.target.formId

        let errMsg;
        if (!this.travelDate) {
          errMsg = '请选择旅行日期w'
        } else if (!this.travelTime) {
          errMsg = '请选择旅行时间w'
        } else if (!this.message) {
          errMsg = '跟向导说点啥邀请成功的机率更高哟w'
        }

        if (errMsg) {
          this.dError(errMsg)

          // 输出提示信息
          wx.showToast({
            icon: 'none',
            title: errMsg
          })

          return
        }

        // TODO 发往多个向导
        const order = {
          touristId: this.touristId,
          guideId: this.guide.id,
          spotId: this.spotId,
          generatedDate: new Date(),
          travelDate: new Date(`${this.travelDate} ${this.travelTime}`),
          message: this.message
        }

        this.dLog('生成表单', order)

        touristApi.newOrder(
          order,
          formId,
          (res) => {
            const sucMsg = '发起邀请成功'
            this.dLog(sucMsg, res)

            // 跳回
            setTimeout(
              () => {
                wx.navigateBack({
                  delta: 2
                })
              }, 800
            )

            // 输出提示信息
            wx.showToast({
              icon: 'none',
              title: sucMsg
            })
          },
          (rej) => {
            const errMsg = '发起邀请失败'
            this.dError(errMsg, rej)

            // 输出提示信息
            wx.showToast({
              icon: 'none',
              title: errMsg
            })
          }
        )
      }
    }
  }
</script>

<style scoped>
  #out {
    animation: in 0.5s ease-in-out;
  }

  @keyframes in {
    from {
      transform: scaleY(0);
    }
    to {
      transform: scaleY(1.0);
    }
  }

  .confirm-btn-wrapper {
    margin: 10px;
  }
</style>
