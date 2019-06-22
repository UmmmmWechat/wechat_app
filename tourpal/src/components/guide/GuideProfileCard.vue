<!-- 导游个人信息卡片，用于向游客展示 -->
<!-- TODO 添加展示信息 -->
<!-- contactable 表示是否允许联系， 也就是在通过邀请之后才能看到这个导游的联系方式 -->
<!-- 事件 on-cancel 当 order 撤回成功时，发射事件，参数为 order 的 id TODO 没找到这个 -->
<template>
  <div class="d-card" :style="{backgroundColor: color}">
    <div id="out">
      <div id="avatar-wrapper">
        <img
          class="avatar-img"
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
        <div class="text-item" v-if="canInvite">
          <span class="title-span">好评度：</span>
          <progress
            class="progress"
            :percent="computedRate"
            show-info>
          </progress>
        </div>
      </div>
    </div>

    <div
      v-if="canInvite"
      id="btn-wrapper"
      class="invite-a-wrapper">
      <a
        class="button-a d-a"
        @click="handleInvite">
        发起邀请
      </a>
    </div>
  </div>
</template>

<script>
  import {TOURIST_INVITE_GUIDE} from '../../pages/pages_url'
  import {mockGuide} from '../../api/mock/guide_mock_data'
  import {INVITE_GUIDE_INFO} from '../../api/const/guideConst'

  export default {
    props: {
      contactable: {
        type: Boolean,
        default: false
      },
      canInvite: {
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
    data () {
      return {
        componentName: 'GuideProfileCard'
      }
    },
    computed: {
      computedRate () {
        return Math.round(this.guide.goodFeedbackRate)
      }
    },
    methods: {
      dLog (message, ...optionalParams) {
        console.log(this.componentName, message, optionalParams)
      },
      handleInvite () {
        wx.setStorage({
          key: INVITE_GUIDE_INFO,
          data: this.guide,
          success: (suc) => {
            this.dLog('设置邀请目标导游完成', suc)

            const url = `/${TOURIST_INVITE_GUIDE}`
            this.dLog('跳转', url)
            wx.navigateTo({url})
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

    margin: 20px;
    padding: 10px;
  }

  #avatar-wrapper {
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;
  }

  #text-wrapper {
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
  }

  .title-span {
    color: #42b970;
    font-weight: bold;
  }

  .progress {
    width: 400px;
  }

  .avatar-img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: thin solid rgba(0, 0, 0, 0.2);
  }

  .invite-a-wrapper {
    text-align: right;
    padding: 0 40px 40px 0;
  }
</style>

<style src="../../assets/style/d-card.css" scoped></style>
<style src="../../assets/style/d-a.css" scoped></style>
