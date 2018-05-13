<template>
  <div id="out">
    <div id="profile-wrapper">
      <guide-profile-card
      :invitable="false" 
      :guide="guide"/>
    </div>
    <div id="form-wrapper">
      <d-date-picker label="旅游日期" />
      <d-textarea
      label="留言"
      placeholder="请给向导留个言吧"/>
      <button
      type="primary"
      style="margin:10rpx;">
        确定
      </button>
    </div>
  </div>
</template>

<script>
import GuideProfileCard from '../../components/guide/GuideProfileCard';
import DTextarea from '../../components/common/DTextarea';
import DDatePicker from '../../components/common/DDatePicker'
export default {
  components: {
    GuideProfileCard,
    DTextarea,
    DDatePicker
  },
  data () {
    return {
      guide: {},
    }
  },
  mounted () {
    wx.getStorage({
      key: 'guide',
      success: (res) => {
        this.guide = res.data
      },
      fail: (err) => {
        wx.showToast({
          icon: 'none',
          title: '向导信息获取失败'
        })
      }
    })
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
