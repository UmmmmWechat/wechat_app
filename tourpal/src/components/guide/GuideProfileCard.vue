/* 向导个人信息卡片，用于向游客展示 */
/* contactable 表示是否允许联系， 也就是在通过邀请之后才能看到这个导游的联系方式 */
/* 事件 on-cancel 当order 撤回成功时，发射事件，参数为 order的id */
<template>
<div class="d-card" :style="{backgroundColor: color}">
    <div id="out">
        <div id="avatar-wrapper">
            <img
            style="width: 200rpx; height:200rpx; border-radius:50%;"
            :src="guide.avatar"
            alt="头像加载失败">
        </div>
        <div id="text-wrapper">
            <div class="text-item"><span class="title-span">姓名：</span><span>{{ guide.realName }}</span></div>
            <!--<div class="text-item"><span class="title-span">年龄：</span><span>{{ guide.age }}</span></div>-->
             <div class="text-item"><span class="title-span">性别：</span><span>{{ guide.gender }}</span></div>
            <template v-if="contactable">
                <div class="text-item"><span class="title-span">微信：</span><span>{{ guide.wechat }}</span></div>
                <div class="text-item"><span class="title-span">手机：</span><span>{{ guide.phone }}</span></div>
            </template>
            <div class="text-item">
                <span class="title-span">好评度：</span>
                <progress
                style="width:400rpx;"
                :percent="guide.goodFeedbackRate"
                show-info/>
            </div>
        </div>
  </div>

  <div
  v-if="invitable"
  id="btn-wrapper"
  style="text-align:right;padding: 0  40rpx 40rpx 0;">
    <a
    class="d-a"
    @click="handleInvite">
        发起邀请
    </a>
  </div>
</div>
</template>

<script>
import { TOURIST_INVITE_GUIDE } from '../../pages/pages_url';
import { mockGuide } from '../../api/mock/guide_mock_data';
import { INVITE_GUIDE_INFO } from '../../api/const/guideConst';

export default {
    props: {
        contactable: {
            type: Boolean,
            default: false
        },
        invitable: {
            type: Boolean,
            default: true
        },
        guide: {
            type: Object,
            default: mockGuide
        },
        color: {
            type: String
        }
    },
    data() {
        return {
            componentName: "GuideProfileCard"
        }
    },
    methods: {
        dLog(message, ...optionalParams) {
            console.log(this.componentName, message, optionalParams);
        },
        handleInvite (event) {
            wx.setStorage({
                key: INVITE_GUIDE_INFO,
                data: this.guide,
                success: (suc) => {
                    this.dLog("设置邀请目标导游完成", suc);

                    const url = `/${TOURIST_INVITE_GUIDE}`;
                    this.dLog('跳转', url);
                    wx.navigateTo({ url });
                }
            })
        }
    }
}
</script>

<style scoped>
#out {
    color: gray;

    text-align: left;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    margin: 20rpx;
    padding: 10rpx;
}

#avatar-wrapper {
    margin: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;
}

#text-wrapper {
    margin: 20rpx;
}

.title-span {
    color: #42b970;
    font-weight: bold;
}
</style>

<style src="../../assets/style/d-card.css" scoped/>
<style src="../../assets/style/d-a.css" scoped/>
