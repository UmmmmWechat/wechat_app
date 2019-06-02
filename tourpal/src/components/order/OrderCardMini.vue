<!-- mini 邀请卡片 用于日历页显示 -->
<!-- TODO 展示游客编号改为游客名称 -->
<template>
  <div>
    <div class="d-card">
      <div class="error-wrapper" v-if="errorOccur">
        粗错啦 QWQ
      </div>
      <div v-else>
        <div id="body" @click="checkOrderDetail">
          <div><span class="title-span">景点：</span><span>{{ spotName }}</span></div>
          <div><span class="title-span">游客编号：</span><span>{{ touristId }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as urlList from '../../pages/pages_url'

  import commonApi from '../../api/common'
  import {SELECTED_ORDER_INFO} from '../../api/const/guideConst'

  export default {
    props: {
      order: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        spotName: '',
        touristId: '',
        errorOccur: false
      }
    },
    mounted () {
      this.errorOccur = false
      commonApi.querySpotById(
        this.order.spotId,
        (res) => {
          this.spotName = res.name
          this.order.spotName = this.spotName
        },
        () => {
          this.errorOccur = true
        }
      )
      this.touristId = this.order.touristId
    },
    methods: {
      checkOrderDetail () {
        wx.setStorage({
          key: SELECTED_ORDER_INFO,
          data: this.order,
          success: function (res) {
            console.log(res)
            wx.navigateTo({
              url: '/' + urlList.GUIDE_CHECK_ORDER
            })
          },
          fail: function (res) {
            console.log(res)
          }
        })
      }
    }
  }
</script>

<style scoped>

  #body {
    padding: 20px 20px 20px 20px;
    /* color: black; */
    color: gray;
  }

  .title-span {
    font-weight: bold;
  }

  .error-wrapper {
    text-align: center;
    padding: 20px;
  }

</style>
<style scoped src="../../assets/style/d-card.css"></style>
<style scoped src="../../assets/style/d-a.css"></style>

