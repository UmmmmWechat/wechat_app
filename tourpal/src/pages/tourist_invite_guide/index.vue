<template>
  <div id="out">
    <div id="profile-wrapper">
      <guide-profile-card
      :invitable="false"
      :guide="guide"/>
    </div>
    <div id="form-wrapper">
      <form 
      report-submit
      @submit="handleSubmit">
      <d-date-picker
        label="旅游日期"
        :start="start"
        :end="end"
      />
      <d-textarea
      label="留言"
      placeholder="请给向导留个言吧"/>
      <button
      formType="submit"
      open-type="contact"
      type="primary"
      style="margin: 10rpx;">
        确定
      </button>
      </form>
    </div>
  </div>
</template>

<script>
import GuideProfileCard from '../../components/guide/GuideProfileCard'
import DTextarea from '../../components/common/DTextarea'
import DDatePicker from '../../components/common/DDatePicker'
var format = (date) => {
  let y = date.getFullYear()
  let m = date.getMonth()
  m = m < 10 ? ('0' + m) : m
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return y + '-' + m + '-' + d
}
export default {
  components: {
    GuideProfileCard,
    DTextarea,
    DDatePicker
  },
  data () {
    return {
      guide: {},
      start: '1900-01-01',
      end: '2200-01-01',
      // form相关
      travelDate: '',
      message: '',
      spotId: '',
      formId: ''
    }
  },
  mounted () {
    wx.getStorage({
      key: 'guide',
      success: (res) => {
        this.guide = res.data
      },
      fail: () => {
        wx.showToast({
          icon: 'none',
          title: '向导信息获取失败'
        })
      }
    })
    let startDate = new Date()
    let endDate = new Date()
    endDate.setDate(startDate.getDate() + 30)
    this.start = format(startDate)
    this.end = format(endDate)
  },
  methods: {
    handleSubmit (e) {
      console.log(e)
      // 获取formId
      this.formId = e.target.formId
    }
  }
}
</script>

<style scoped>
#out {
  animation: in 0.5s ease-in-out;
}
@keyframes in {
  from {transform: scaleY(0);}
  to {transform: scaleY(1.0);}

}
</style>
