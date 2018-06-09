<template>
<section>
  <div style="text-align: center">
    <img :src="guide.avatar"/>
  </div>
  <div class="name-wrapper">
    {{ guide.realName }}
  </div>
  <div class="content-wrapper">
    <div class="item-wrapper">
      <span class="title-span">好评率：</span>
      <progress
        :percent="guide.goodFeedbackRate"
        show-info/>
    </div>
    <div class="item-wrapper"><span class="title-span">性别：</span>{{ guide.gender }}</div>
    <div class="item-wrapper">
      <span class="title-span">
        微信：
      </span>
      <span style="text-decoration: underline" @click="handleClickWechat">
        {{ guide.wechat }}
      </span>
    </div>
    <div class="item-wrapper">
      <span class="title-span">
        电话：
      </span>
      <span style="text-decoration: underline" @click="handleClickPhone">
        {{ guide.phone }}
      </span>
    </div>
    <div class="item-wrapper"><span class="title-span">自我介绍：</span>{{ guide.introduction }}</div>
  </div>
</section>
</template>

<script>
import { CHECK_GUIDE_ID } from '../../components/tourist/constant'
import commonApi from '../../api/common'
export default {
  data() {
    return {
      guideId: undefined,
      pageName: "show_guide_page",
      guide: {},
      phoneActionSheetItemList: ['拨打电话', '保存到联系人'],
      wechatActionSheetItemList: ['复制到剪贴板']
    }
  },
  mounted() {
    this.guideId = wx.getStorageSync(CHECK_GUIDE_ID);
    // this.guideId = 1
    if (!this.guideId) {
      // 跳回
      wx.navigateBack();

      // 未找到向导ID
      this.showErrorRoast("粗错啦QWQ");
      return;
    }

    // TODO 取得 Guide
    this.queryGuide();
  },
  methods: {
    handleClickPhone () {
      wx.showActionSheet({
        itemList: this.phoneActionSheetItemList,
        success: res => {
          switch (res.tapIndex) {
            case 0:
              this.dLog('make phone call')
              wx.makePhoneCall({
                phoneNumber: this.guide.phone
              })
              break
            case 1:
              wx.addPhoneContact({
                mobilePhoneNumber: this.guide.phone
              })
              break
            default:
              break
          }
        }
      })
    },
    handleClickWechat () {
      wx.showActionSheet({
        itemList: this.wechatActionSheetItemList,
        success: res => {
          switch (res.tabIndex) {
            case 0:
              wx.setClipboardData({
                data: this.guide.wechat,
                success: res => {
                  wx.showToast({
                    title: '已复制到剪贴板'
                  })
                },
                fail: err => {
                  this.dError(err)
                }
              })
              break
            default:
              break
          }
        }
      })
    },
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
    queryGuide () {
      this.dLog(`queryGuide 方法调用 guideId: ${this.guideId}`);
      commonApi.queryGuideById(
        this.guideId,
        res => {
          this.dLog("取得向导信息成功", res);
          this.guide = res;
        },
        err => {
          // 跳回
          wx.navigateBack();

          const errMsg = "没找到向导信息QWQ";
          this.showErrorRoast(errMsg, err);
        }
      )
    }
  }
}
</script>

<style scoped>
.name-wrapper {
  font-size: 1.5em;
  font-weight: bold;
  padding: 10rpx;
  text-align: center;
}
  .content-wrapper {
    padding: 20rpx 50rpx;
    text-align: left;
  }
  .item-wrapper {
    margin: 10rpx 0;
  }
  .title-span {
    color:  #42b970;
    font-weight: bold;
  }

</style>
