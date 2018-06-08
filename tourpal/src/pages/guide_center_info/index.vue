<template>
    <div>
        <div class="wrapper">
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
            <!--  -->
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
                    <span class="link">{{ guide.favorSpots }}</span>
                </div>
                <div class="info-item">
                    <span class="title-span">好评度：</span>
                    <span>
                        <progress 
                        :percent="guide.goodFeedbackRate" 
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

export default {
    components: {
        DInput,
        DTextArea,
        DChooseSpots
    },
    data() {
        return {
            editmode: false,
            guide: {
                avatar: mockUserAvatorUrl,
                realName: "体验向导",
                wechat: "youbanwechat",
                phone: "000-0000-0000",
                introduction: "请简短地介绍自己",
                goodFeedbackRate: 10,
                favorSpots: ["spot1", "spot2", "spot3"]
            },
            form: {
                guideId:"",
                wechat: "",
                phone: "",
                introduction: "",
                favorSpots: []
            }
        }
    },
    mounted() {
        wx.getStorage({
            key: 'guideInfo',
            success: (res) => {
                console.log("取得向导信息成功", res)
                this.guide = res.data
                this.refreshForm()
            },
            fail: (fai) => {
                console.error("取得向导信息失败", fai)
            }
        })
    },
    methods: {
        refreshForm() {
            // 更新form
            this.form.guideId = this.guide.guideId
            this.form.wechat = this.guide.wechat
            this.form.phone = this.guide.phone
            this.form.introduction = this.guide.introduction
            this.form.favorSpots = this.guide.favorSpots
        },
        handleStartModify(event) {
            console.log("修改信息", event)
            this.editmode = true
        },
        handleSubmit(event) {
            console.log("修改提交", event)
            guideApi.modifyUserInfo(
                this.form,
                (res) => {
                    console.log("修改成功", res)
                    this.guide = res.guide
                    this.refreshForm()
                    this.editmode = false
                },
                (rej) => {
                    console.log("修改失败", rej)
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
