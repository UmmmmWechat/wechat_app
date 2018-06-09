<template>
    <div>
        <div class="wrapper" v-if="guide">

            <div class="head">
                <div>
                    <img 
                    class="avatar"
                    :src="guide.avatar" 
                    alt="头像加载失败"
                    >
                </div>
                <div class="text">{{ guide.realName }}</div>
            </div>
            
            <div  v-if="!editmode">
                <div class="info-item">
                    <span class="title-span">微信号：</span>
                    <span class="info-span">{{ guide.wechat }}</span>
                </div>
                <div class="info-item">
                    <span class="title-span">手机号：</span>
                    <span class="info-span">{{ guide.phone }}</span>
                </div>
                <div class="info-item">
                    <span class="title-span">个人简介：</span>
                    <span class="info-span">{{ guide.introduction }}</span>
                </div>
                <div class="info-item">
                    <span class="title-span">负责景点：</span>
                    <span class="info-span">{{ getSpotList }}</span>
                </div>
                <div class="info-item">
                    <span class="title-span">好评度：</span>
                    <span>
                        <progress 
                        :percent="computedGoodRate" 
                        show-info/>
                    </span>
                </div>
                <div class="info-wrapper button-wrapper">
                    <button 
                    type="primary"
                    @click="handleStartModify">
                    修改信息
                    </button>
                </div>
            </div>
        </div>

        <div v-if="editmode">
            <div class="item-wrapper">
                <d-input
                    label="微信号"
                    :value="guide.wechat"
                    placeholder="用于游客联系"
                    confirm-type="search"
                    @input="form.wechat = $event"/>
            </div>

            <div class="item-wrapper">
                <d-input
                    label="手机号"
                    :value="guide.phone"
                    placeholder="用于游客联系"
                    confirm-type="search"
                    @input="form.phone = $event"/>
            </div>

            <div class="item-wrapper">
                <d-input
                    label="个人简介"
                    :value="guide.introduction"
                    placeholder="请简短地介绍自己"
                    confirm-type="search"
                    @input="form.introduction = $event"/>
            </div>
            
            <div class="item-wrapper">
                <d-choose-spots
                label="负责景点"
                :spots="form.favorSpots"/>
            </div>

            <div class="item-wrapper button-wrapper">
                <button 
                type="primary"
                @click="handleSubmit">
                确定
                </button>
            </div>

            <div class="item-wrapper button-wrapper" v-if="!hasOfferedInfo">
                <button 
                open-type="getUserInfo" 
                @getuserinfo="handleGetUserInfo">
                    授权头像信息并提交
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import DInput from '../../components/common/DInput'
import DTextArea from '../../components/common/DTextarea'
import DChooseSpots from '../../components/common/DChooseSpots'

import guideApi from '../../api/guide'
import { GUIDE_INFO, SELECTED_SPOTS } from '../../api/const/guideConst';
import { mockGuide } from '../../api/mock/guide_mock_data';
import { MOCK_USER_AVATOR_URL } from '../../api/const/imgConst';

export default {
    components: {
        DInput,
        DTextArea,
        DChooseSpots
    },
    data() {
        return {
            editmode: false,
            guide: undefined,
            modifyGuide: mockGuide,
            form: {
                wechat: "",
                phone: "",
                introduction: "",
                favorSpots: []
            },
            hasOfferedInfo: false,
            pageName: 'guide_center_info'
        }
    },
    mounted() {
        // 取得向导信息
        this.guide = wx.getStorageSync(GUIDE_INFO)
        if (!this.guide) {
            // 未取得向导信息
            const errMsg = "粗错啦QWQ没找到你的向导信息"

            // 跳回
            wx.navigateBack()

            // 显示错误信息
            this.showErrorRoast(errMsg)

            return
        }

        this.editmode = false
        this.modifyGuide = this.guide
        this.hasOfferedInfo = this.guide.avatar !== MOCK_USER_AVATOR_URL;

        // 保存景点信息
        wx.setStorageSync(SELECTED_SPOTS, this.guide.favorSpots)
    },
    onShow() {
        // 编辑模式更新负责景点
        if (this.editmode) {
            this.dLog("编辑模式更新景点信息")
            this.form.favorSpots = wx.getStorageSync(SELECTED_SPOTS)
        }
    },
    computed: {
        computedGoodRate () {
            return this.guide ? Math.round(this.guide.goodFeedbackRate) : 0
        },
        getSpotList() {
            if (!this.guide || this.guide.favorSpots.length === 0){
                return '未选择，点击选择景点';
            } else {  
                var res = this.guide.favorSpots.map(
                    (spot) => spot.name
                ).reduce(
                    (x, y) => x + '，' + y
                )
                return res;
            }
        }
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
        handleStartModify(event) {
            this.dLog("修改信息", event)
            this.form.favorSpots = wx.getStorageSync(SELECTED_SPOTS)
            this.editmode = true
        },
        handleSubmit(event, ...hasChecked) {
            this.dLog("修改提交", event)
            if (hasChecked || this.checkModify()) {
                guideApi.modifyUserInfo(
                    this.modifyGuide,
                    (res) => {
                        const sucMsg = "修改成功"
                        this.dLog("修改成功", res)

                        this.guide = this.modifyGuide
                        this.guide.favorSpots = this.form.favorSpots
                        wx.setStorage({
                            key: GUIDE_INFO,
                            data: this.guide,
                            success: (suc) => {
                                this.editmode = false

                                // 输出提示信息 
                                wx.showToast({
                                    icon: 'none',
                                    title: sucMsg
                                });
                            }
                        })
                    },
                    (rej) => {
                        const errMsg = "修改失败"
                        this.showErrorToast(errMsg, rej);
                    }
                )
            }
        },
        handleGetUserInfo(event) {
            this.dLog("handleGetUserInfo 方法调用", event)

            if (this.checkModify) {
                // 修改合法
                this.guide.avatar = event.target.userInfo.avatarUrl

                this.hasOfferedInfo = true
                this.handleSubmit(event, true)
            }
        },
        checkModify() {
            this.dLog("checkModify 方法调用", this.form, this.modifyGuide)

            // 检查修改合法性
            if (!this.form.wechat) {
                const errMsg = "请输入你的微信号"
                this.showErrorToast(errMsg);
                return false;
            } else if (!this.form.phone) {
                const errMsg = "请输入你的手机号"
                this.showErrorToast(errMsg);
                return false;
            } else if (!this.form.introduction) {
                const errMsg = "请简短地介绍下自己"
                this.showErrorToast(errMsg);
                return false;
            } else if (!this.form.favorSpots || !this.form.favorSpots.length) {
                const errMsg = "请输入你想负责的景点"
                this.showErrorToast(errMsg);
                return false;
            }

            // 保存修改信息
            this.modifyGuide.wechat = this.form.wechat
            this.modifyGuide.phone = this.form.phone
            this.modifyGuide.introduction = this.form.introduction
            this.modifyGuide.favorSpots = wx.getStorageSync(SELECTED_SPOTS)

            return true
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
}

.head {
    margin-bottom: 20rpx;
}

.wrapper, .text {
    padding: 20rpx;
}

.avatar {
    margin: 20rpx;
    height: 200rpx;
    width: 200rpx;
    border-radius: 50%;
}

.info-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    text-align: left;
}

.info-item, .item-wrapper {
    padding: 10rpx;
}

.button-wrapper {
    margin-top: 50rpx;
}

.title-span {
  font-weight: bold;
  width: 190rpx;
}

.info-span, progress {
  width: 500rpx;
}
</style>
