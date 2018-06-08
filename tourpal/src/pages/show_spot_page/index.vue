<template>
<section>
  show spot page!
</section>
</template>

<script>
import { CHECK_SPOT_ID } from '../../components/tourist/constant';

export default {
  data() {
    return {
      spotId: undefined,
      pageName: "show_spot_page"
    }
  },
  mounted() {
    this.spotId = wx.getStorageSync(CHECK_SPOT_ID);
    if (!this.spotId) {
      // 未找到景点ID
      this.showErrorRoast("粗错啦QWQ");

      // 跳回
      wx.navigateBack();
      return;
    }

    // TODO 取得 Spot
    this.querySpot();
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
    querySpot() {
      this.dLog(`querySpot 方法调用 spotId: ${this.spotId}`);
      // TODO
    }
  }
}
</script>

<style scoped>

</style>
