<template>
  <section>
    <div style="text-align: center; margin: 20px;">
      <img class="avatar" :src="guide.avatar"/>
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
      <div class="item-wrapper">
        <span class="title-span">性别：</span>
        <span>{{ guide.gender }}</span>
      </div>
      <div class="item-wrapper">
        <span class="title-span">微信：</span>
        <span style="text-decoration: underline" @click="handleClickWechat">{{ guide.wechat }}</span>
      </div>
      <div class="item-wrapper">
        <span class="title-span">电话：</span>
        <span style="text-decoration: underline" @click="handleClickPhone">{{ guide.phone }}</span>
      </div>
      <div class="item-wrapper">
        <span class="title-span">自我介绍：</span>
        <span>{{ guide.introduction }}</span>
      </div>
    </div>
  </section>
</template>

<script>
  import {CHECK_GUIDE} from '../../api/const/touristConst'

  export default {
    data () {
      return {
        pageName: 'show_guide_page',
        guide: {},
        phoneActionSheetItemList: ['拨打电话', '保存到联系人'],
        wechatActionSheetItemList: ['复制到剪贴板']
      }
    },
    beforeMount () {
      // 取得 Guide
      this.guide = wx.getStorageSync(CHECK_GUIDE)
      if (!this.guide) {
        // 跳回
        wx.navigateBack()

        // 未找到导游ID
        this.showErrorToast('粗错啦QWQ没有找到你要的导游')
      }
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
                  success: () => {
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
      dLog (message, ...optionalParams) {
        console.log(this.pageName, message, optionalParams)
      },
      dError (message, ...optionalParams) {
        console.error(this.pageName, message, optionalParams)
      },
      showErrorToast (errMsg, ...fai) {
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
  .avatar {
    margin: 20px;
    height: 200px;
    width: 200px;
    border-radius: 50%;
  }

  .name-wrapper {
    font-size: 1.5em;
    font-weight: bold;
    padding: 10px;
    text-align: center;
  }

  .content-wrapper {
    padding: 20px 50px;
    text-align: left;
  }

  .item-wrapper {
    margin: 10px 0;
  }

  .title-span {
    color: #42b970;
    font-weight: bold;
  }
</style>
