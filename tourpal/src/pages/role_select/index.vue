<template class="page">
  <div class="container">
<!--    <img v-bind:src="logoUrl" class="logo">-->
    <Logo v-bind:width="540"/>
    <div class="text">
<!--      <div class="title">-->
<!--        游伴，有伴-->
<!--      </div>-->
      <div class="intro">
        自由、可靠、免费的导游平台
      </div>
    </div>
    <div class="divider" />
    <div class="card">
      <div class="card-title">请问您是</div>
      <div class="roles">
        <div class="role"
             v-bind:class="{'role-selected': selectedRole === GUIDE}"
             v-on:click="handleClickRole(GUIDE)">
          <img v-bind:src="guideIcon" class="role-img">
          <span class="role-span">导游</span>
        </div>
        <div class="role"
             v-bind:class="{'role-selected': selectedRole === TOURIST}"
              v-on:click="handleClickRole(TOURIST)">
          <img v-bind:src="touristIcon" class="role-img">
          <span class="role-span">游客</span>
        </div>
      </div>
    </div>
    <button v-bind:disabled="!selectedRole" type="primary" class="button" v-on:click="handleClickStart">
      开始旅程
    </button>
  </div>
</template>

<script>
  import {TOURIST_MAIN, GUIDE_SIGN_UP, GUIDE_MAIN} from '../pages_url'
  import {USER_TYPE, TOURIST, GUIDE} from '../../api/const/commonConst'

  import guideApi from '../../api/guide'
  import touristApi from '../../api/tourist'
  import guideIcon from "../../assets/image/icon_ natural persons.png";
  import touristIcon from "../../assets/image/icon_ natural persons_2.png";
  import Logo from "../../components/common/Logo";

  export default {
    components: {Logo},
    data () {
      return {
        touristPrompot: {
          title: '游客',
          extra: '我达达的马蹄，美丽的错误'
        },
        guidePrompt: {
          title: '向导',
          extra: '守着这一方水土，等待着谁的到来'
        },
        pageName: 'role_select',
        guideIcon: guideIcon,
        touristIcon: touristIcon,
        selectedRole: "",
        isLoading: false,
        TOURIST,
        GUIDE
      }
    },
    mounted () {
      const userType = wx.getStorageSync(USER_TYPE);
      let url = '/';
      if (userType === TOURIST) {
        url += TOURIST_MAIN
      } else if (userType === GUIDE) {
        url += GUIDE_MAIN
      } else {
        return;
      }
      console.log('lasturl:', url);
      wx.redirectTo({
        url,
        fail: (e) => {
          console.error(e);
        }
      })
    },
    methods: {
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
      },
      handleClickRole (role) {
        this.dLog("选择了" + role);
        this.selectedRole = role;
      },
      handleClickStart () {
        if (!this.isLoading) {
          this.isLoading = true;
          switch (this.selectedRole) {
            case GUIDE:
              guideApi.logIn(
                (res) => {
                  // resolve
                  this.dLog('向导登录成功', res)

                  wx.setStorageSync(USER_TYPE, GUIDE)

                  if (res.isNewGuide) {
                    const url = `/${GUIDE_SIGN_UP}`
                    this.dLog('跳转', url)
                    wx.redirectTo({url})
                  } else {
                    const url = `/${GUIDE_MAIN}`
                    this.dLog('跳转', url)
                    wx.redirectTo({url})
                  }

                  this.isLoading = false;
                },
                (fai) => {
                  this.showErrorToast('向导登录失败', fai)
                  this.isLoading = false;
                }
              )
              break;
            case TOURIST:
              touristApi.logIn(
                (suc) => {
                  // resolve
                  this.dLog('游客登录成功', suc)

                  const url = `/${TOURIST_MAIN}`
                  this.dLog('跳转', url)
                  wx.redirectTo({
                    url,
                    success: () => {
                      wx.setStorageSync(USER_TYPE, TOURIST)
                    }
                  })

                  this.isLoading = false;
                },
                (fai) => {
                  this.showErrorToast('游客登录失败', fai)

                  this.isLoading = false;
                }
              )
              break;
            default:
              this.isLoading = false;
          }
        }
      }
      // handleChooseTourist () {
      //   // 选择游客
      //   this.dLog('选择了游客')
      //
      //   touristApi.logIn(
      //     (suc) => {
      //       // resolve
      //       this.dLog('游客登录成功', suc)
      //
      //       const url = `/${TOURIST_MAIN}`
      //       this.dLog('跳转', url)
      //       wx.redirectTo({url})
      //     },
      //     (fai) => {
      //       this.showErrorToast('游客登录失败', fai)
      //     }
      //   )
      // },
      // handleChooseGuide () {
      //   // 选择向导
      //   this.dLog('选择了向导')
      //
      //   guideApi.logIn(
      //     (res) => {
      //       // resolve
      //       this.dLog('向导登录成功', res)
      //
      //       if (res.isNewGuide) {
      //         const url = `/${GUIDE_SIGN_UP}`
      //         this.dLog('跳转', url)
      //         wx.navigateTo({url})
      //       } else {
      //         const url = `/${GUIDE_MAIN}`
      //         this.dLog('跳转', url)
      //         wx.switchTab({url})
      //       }
      //     },
      //     (fai) => {
      //       this.showErrorToast('向导登录失败', fai)
      //     }
      //   )
      // }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    height: 100vh;
    width: 100vw;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  .logo {
    width: 540px;
    height: 360px;
  }

  .text {
    margin-top: -2em;
    text-align: center;
    color: #464c5b;
  }

  .intro {
    font-size: 1.2em;
  }

  .divider {
    border-width: 0;
    border-bottom: thin solid rgba(0,0,0,0.1);
    width: calc(100vw - 3em);
    margin: 1.5em;
  }

  .card {
    width: 600px;
  }

  .card-title {
    color: #9ea7b4;
    text-align: center;
  }

  .roles {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .role {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1.5em;
    box-shadow: rgba(0,0,0,0.1) 0 0 10px;
    padding: 10px;
    border: rgba(0,0,0,0.1) thin solid;
  }

  .role-selected {
    border: #42b970 2px solid;
  }

  .role-img {
    width: 150px;
    height: 150px;
  }

  .role-span {
    font-size: 0.7em;
    color: #9ea7b4;
  }

  .button {
    padding: 0;
    width: 500px;
    font-size: 1em;
  }


</style>
