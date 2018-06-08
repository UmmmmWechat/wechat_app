<template>
<section>
  show guide page!
</section>
</template>

<script>
import { CHECK_GUIDE_ID } from '../../components/tourist/constant';

export default {
  data() {
    return {
      guideId: undefined,
      pageName: "show_guide_page"
    }
  },
  mounted() {
    this.guideId = wx.getStorageSync(CHECK_GUIDE_ID);
    if (!this.guideId) {
      // 未找到景点ID
      this.showErrorRoast("粗错啦QWQ");

      // 跳回
      wx.navigateBack();
      return;
    }

    // TODO 取得 Guide
    this.queryGuide();
  },
  methods: {
    dLog(message, ...optionalParams) {
        console.log(this.pageName, message, optionalParams);
    },
    dError(message, ...optionalParams) {
        console.error(this.pageName, message, optionalParams);
    },
    showErrorRoast(errMsg, ...fai) {
      this.dError(errMsg, fai);
    
      // 输出提示信息 
      wx.showToast({
          icon: 'none',
          title: errMsg
      });
    },
    queryGuide() {
      this.dLog(`queryGuide 方法调用 guideId: ${this.guideId}`);
      // TODO
    }
  }
}
</script>

<style scoped>

</style>
