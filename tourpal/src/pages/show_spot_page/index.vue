<template>
<section>
  <spot-card :spot="spot" :no-action="true"/>
  <div style="padding: 20rpx;">
    <button open-type="share" type="primary">分享给好友</button>
  </div>
</section>
</template>

<script>
import { CHECK_SPOT } from '../../api/const/touristConst'
import SpotCard from '../../components/spot/SpotCard'
import commonApi from '../../api/common'
import spot from '../../api/spot'

export default {
  components: {
    SpotCard
  },
  data () {
    return {
      pageName: 'show_spot_page',
      spot: {}
    }
  },
  mounted () {
    // 取得 Spot
    this.spot = wx.getStorageSync(CHECK_SPOT)
    if (!this.spot) {
      // 跳回
      wx.navigateBack()

      // 未找到景点
      this.showErrorRoast('粗错啦QWQ没找到你要的景点');

      return
    }
  },
  methods: {
    onShareAppMessage () {
      this.dLog('share')
    },
    dLog (message, ...optionalParams) {
      console.log(this.pageName, message, optionalParams)
    },
    dError (message, ...optionalParams) {
      console.error(this.pageName, message, optionalParams)
    },
    showErrorRoast (errMsg, ...fai) {
      this.dError(errMsg, fai)

      // 输出提示信息
      wx.showToast({
        icon: 'none',
        title: errMsg
      })
    }
  }
}
</script>

<style scoped>

</style>
