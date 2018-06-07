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
          result="可预约四周内的时间"
          :start="start"
          :end="end"
          @on-change="handleDateChanged"
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

import { mockGuide } from '../../api/mock/guide_mock_data';
import { INVITE_GUIDE_INFO } from '../../components/guide/constant';
import { formatDate } from '../../utils/dUtils';

export default {
  components: {
    GuideProfileCard,
    DTextarea,
    DDatePicker
  },
  data () {
    return {
      guide: mockGuide,
      start: '1900-01-01',
      end: '2200-01-01',

      // form相关
      travelDate: '',
      message: '',
      spotId: '',
      formId: '',

      pageName: 'tourist_invite_guide'
    }
  },
  mounted () {
    wx.getStorage({
      key: INVITE_GUIDE_INFO,
      success: (res) => {
        this.dLog("取得向导信息成功", res);
        this.guide = res.data;

        // 设置时间区间
        let startDate = new Date();
        let endDate = new Date();
        endDate.setDate(startDate.getDate() + 28);
        this.start = formatDate(startDate);
        this.end = formatDate(endDate);
      },
      fail: (fai) => {
        const errMsg = "向导信息获取失败";
        this.dError(errMsg, fai);

        wx.navigateBack();
        
        // 输出提示信息 
        wx.showToast({
            icon: 'none',
            title: errMsg
        });
      }
    })
  },
  methods: {
    dLog(message, ...optionalParams) {
        console.log(this.pageName, message, optionalParams);
    },
    dError(message, ...optionalParams) {
        console.error(this.pageName, message, optionalParams);
    },
    handleSubmit(e) {
      this.dLog("handleSubmit 方法调用", e);

      // 获取formId
      this.formId = e.target.formId;
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
