<template>
<section>
  <spot-card :spot="spot" :no-action="true"/>
  <div style="padding: 20rpx;">
    <button open-type="share" type="primary">分享给好友</button>
  </div>
</section>
</template>

<script>
import { CHECK_SPOT_ID } from '../../components/tourist/constant'
import SpotCard from '../../components/spot/SpotCard'
import commonApi from '../../api/common'
import spot from '../../api/spot'

export default {
  components: {
    SpotCard
  },
  data () {
    return {
      spotId: undefined,
      pageName: 'show_spot_page',
      spot: {}
    }
  },
  mounted () {
    this.spotId = wx.getStorageSync(CHECK_SPOT_ID)
    // this.spotId = 1 // 测试的时候 我写死是 1
    if (!this.spotId) {
      // 跳回
      wx.navigateBack()

      // 未找到景点ID
      this.showErrorRoast('粗错啦QWQ');

      return
    }

    // TODO 取得 Spot
    this.querySpot()
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
    },
    querySpot () {
      this.dLog(`querySpot 方法调用 spotId: ${this.spotId}`)
      commonApi.querySpotById(
        this.spotId,
        (res) => {
          this.spot = res
        },
        (err) => {
          this.dError(err)
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
