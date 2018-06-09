/* guide 的个人信息卡片 */
<template>
  <div class="wrapper">
      <div>
          <img 
          class="avatar"
            :src="avatar" 
            alt="头像加载失败"
            >
      </div>
      <div class="text">{{ realName }}</div>
  </div>
</template>

<script>
import GuideApi from "../../api/guide"

import { GUIDE_ID, GUIDE_INFO } from '../../api/const/guideConst';
import { ROLE_SELECT } from '../../pages/pages_url';
import { MOCK_USER_AVATOR_URL } from '../../api/const/imgConst';

export default {
    data() {
        return {
            avatar: MOCK_USER_AVATOR_URL,
            realName: "体验向导",
            guideId: "",
            componentName: 'ProfileCard'
        }
    },
    mounted() {
        // 取得向导信息
        const guide = wx.getStorageSync(GUIDE_INFO)
        this.guideId = wx.getStorageSync(GUIDE_ID)

        if (!guide) {
            // 取得本地缓存信息失败
            if (!this.guideId) {
                // 登录过期，重新登录
                this.reLogin()
            } else {
                GuideApi.queryUserInfo(
                    this.guideId,
                    (res) => {
                        this.dLog("取得向导信息成功")
                        this.setGuideInfo(res)
                    },
                    (rej) => {
                        const errMsg = "取得向导信息失败"
                        this.showErrorRoast(errMsg)
                    }
                )
            }

        } else {
            if (this.guideId !== guide.id) {
                // 登录过期，重新登录
                this.reLogin()
            } else {
                // 设置信息
                this.setGuideInfo(guide)
            }
        }
    },
    methods: {
        dLog (message, ...optionalParams) {
            console.log(this.componentName, message, optionalParams)
        },
        dError (message, ...optionalParams) {
            console.error(this.componentName, message, optionalParams)
        },
        showErrorRoast(errMsg, ...fai) {
            this.dError(errMsg, fai);
            
            // 输出提示信息 
            wx.showToast({
                icon: 'none',
                title: errMsg
            });
        },
        setGuideInfo(guide) {
            this.dLog("setGuideInfo 方法调用", guide)

            this.avatar = guide.avatar
            this.realName = guide.realName
            this.guideId = guide.id

            // 存储更新向导信息
            wx.setStorage({
                key: GUIDE_INFO,
                data: guide
            })
        },
        reLogin() {
            this.dLog("reLogin 方法调用")

            // 取得向导ID失败
            const url = `/${ROLE_SELECT}`;
            this.dLog('跳转', url);
            wx.navigateTo({ url });

            // 输出提示信息 
            wx.showToast({
                icon: 'none',
                title: "登录过期请重新登录w"
            });
        }
    }
}
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 20rpx;
}

.text {
    padding: 20rpx;
}

.avatar {
    margin: 20rpx;
    height: 200rpx;
    width: 200rpx;
    border-radius: 50%;
}
</style>
