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
      <div class="text">{{ name }}</div>
  </div>
</template>

<script>
import GuideApi from "../../api/guide"

export default {
    data() {
        return {
            avatar: "/static/image/用户.svg",
            name: "体验向导",
            userId: ""
        }
    },
    mounted() {
        wx.getStorage({
            key: 'guideId',
            success: (res) => {
                console.log("取得向导ID", res)
                this.userId = res.data
                setGuideInfo()

            }
        })
    },
    methods: {
        setGuideInfo() {
            GuideApi.queryUserInfo(
                res.data,
                (res) => {
                    console.log("取得向导信息成功", res)
                    this.avatar = res.avatar
                    this.name = res.name
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
