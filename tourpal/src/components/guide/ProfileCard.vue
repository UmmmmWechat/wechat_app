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
import { mockUserAvatorUrl } from '../../assets/image/imgMock';
import { GUIDE_ID, GUIDE_INFO } from '../../api/const/guideConst';

export default {
    data() {
        return {
            avatar: mockUserAvatorUrl,
            realName: "体验向导",
            userId: ""
        }
    },
    mounted() {
        wx.getStorage({
            key: GUIDE_ID,
            success: (res) => {
                console.log("取得向导ID成功", res)
                this.userId = res.data
                this.setGuideInfo()
            },
            fail: (fai) => {
                console.error("取得向导ID失败", fai)
            }
        })
    },
    methods: {
        setGuideInfo() {
            GuideApi.queryUserInfo(
                this.userId,
                (guide) => {
                    console.log("取得向导信息成功", guide)
                    this.avatar = guide.avatar
                    this.realName = guide.realName
                    wx.setStorage({
                        key: GUIDE_INFO,
                        data: guide,
                        success: (suc) => {
                            console.log("存储导游信息成功", suc)
                        },
                        fail: (fai) => {
                            console.log("存储导游信息失败", fai)
                        }
                    })
                },
                (rej) => {
                    console.log("取得向导信息失败", rej)
                }
            )
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
