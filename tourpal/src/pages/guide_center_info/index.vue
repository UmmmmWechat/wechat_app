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
                    <span class="link">{{ guide.wechat }}</span>
                </div>
                <div class="info-item">
                    <span class="title-span">手机号：</span>
                    <span class="link">{{ guide.phone }}</span>
                </div>
                <div class="info-item">
                    <span class="title-span">个人简介：</span>
                    <span class="link">{{ guide.introduction }}</span>
                </div>
                <div class="info-item">
                    <span class="title-span">负责景点：</span>
                    <span class="link">{{ getSpotList }}</span>
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
                :value="form.wechat" 
                placeholder="用于游客联系" 
                label="微信号"/>
            </div>
            <div class="item-wrapper">
                <d-input
                :value="form.phone" 
                placeholder="用于游客联系" 
                label="微信号"/>
            </div>
            <div class="item-wrapper">
                <d-text-area
                :value="form.introduction"
                placeholder="请简短地介绍自己"
                label="个人简介"/>
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
        </div>

    </div>
</template>

<script>
import DInput from '../../components/common/DInput'
import DTextArea from '../../components/common/DTextarea'
import DChooseSpots from '../../components/common/DChooseSpots'

import guideApi from '../../api/guide'
import { mockUserAvatorUrl } from '../../assets/image/imgMock';
import { GUIDE_INFO } from '../../api/const/guideConst';

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
            form: {
                guideId:"",
                wechat: "",
                phone: "",
                introduction: "",
                favorSpots: []
            },
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
        refreshForm() {
            // 更新form
            this.form.guideId = this.guide.guideId
            this.form.wechat = this.guide.wechat
            this.form.phone = this.guide.phone
            this.form.introduction = this.guide.introduction
            this.form.favorSpots = this.guide.favorSpots
        },
        handleStartModify(event) {
            this.dLog("修改信息", event)
            this.editmode = true
        },
        handleSubmit(event) {
            this.dLog("修改提交", event)
            guideApi.modifyUserInfo(
                this.form,
                (res) => {
                    this.dLog("修改成功", res)
                    this.guide = res.guide
                    this.refreshForm()
                    this.editmode = false
                },
                (rej) => {
                    this.dLog("修改失败", rej)
                }
            )
            this.editmode = false
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

.link {
  text-decoration: underline;
}

.link, progress {
  width: 500rpx;
}

</style>
