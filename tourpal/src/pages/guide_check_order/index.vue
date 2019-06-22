<template>
  <section id="page">
    <d-loading :loading="loading"/>
    <section v-if="order && !loading">
      <section id="info-section">
        <section class="info-item">
          <span class="title-span">邀请编号：</span>
          <span class="value-span">{{ order.id }}</span>
        </section>
        <section class="info-item">
          <span class="title-span">邀请状态：</span>
          <span class="value-span">{{ statePrompts[order.state] }}</span>
        </section>
        <section class="info-item">
          <span class="title-span">游客编号：</span>
          <span class="value-span">{{ order.touristId }}</span>
        </section>
        <section class="info-item">
          <span class="title-span">景点名称：</span>
          <span class="value-span">{{ order.spotName }}</span>
        </section>
        <section class="info-item">
          <span class="title-span">提交日期：</span>
          <span class="value-span">{{ computedCreatedDate }}</span>
        </section>
        <section class="info-item">
          <span class="title-span">旅行日期：</span>
          <span class="value-span">{{ computedTravelDate }}</span>
        </section>
        <section class="info-item">
          <span class="title-span">邀请留言：</span>
          <span class="value-span">{{ order.message }}</span>
        </section>
      </section>

      <footer v-if="order.state === waiting">
        <button
          class="op-btn"
          size="mini"
          @click="handleReject">
          婉拒
        </button>

        <button
          class="d-a op-btn"
          size="mini"
          @click="handleAccept">
          同意
        </button>
      </footer>
    </section>
  </section>
</template>

<script>
  import DLoading from '../../components/common/DLoading'

  import guideApi from '../../api/guide'

  import {SELECTED_ORDER_INFO, STATES_ARRAY, WAITING_STATE} from '../../api/const/guideConst'
  import {statePrompts} from '../../api/const/OrderState'
  import * as ResultMessage from '../../api/returnMessage'
  import {formatTime} from '../../utils/dUtils'

  export default {
    components: {
      DLoading
    },
    data () {
      return {
        order: undefined,
        loading: false,
        waiting: STATES_ARRAY[WAITING_STATE],
        pageName: 'guide_check_order',
        statePrompts
      }
    },
    computed: {
      computedTravelDate () {
        if (!this.order) return ''
        return formatTime(new Date(this.order.travelDate));
      },
      computedCreatedDate () {
        if (!this.order) return ''
        return formatTime(new Date(this.order.generatedDate));
      }
    },
    mounted () {
      // 取得order
      this.loading = true

      this.order = wx.getStorageSync(SELECTED_ORDER_INFO)
      if (!this.order) {
        // 取得order信息失败
        const errMsg = '粗错啦QWQ没找到这条邀请'
        // 跳回
        wx.navigateBack()
        // 显示提示信息
        this.showErrorToast(errMsg)

        return
      }

      this.dLog('取得order信息成功', this.order)
      this.loading = false
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
      handleReject (event) {
        this.dLog('handleReject 方法调用', event)

        wx.showModal({
          title: '确定要拒绝这个邀请么？',
          success: (res) => {
            if (res.confirm) {
              this.dLog('确认拒绝', res)
              // api
              guideApi.rejectOrder(
                this.order.id,
                () => {
                  // 跳回
                  wx.navigateBack()

                  wx.showToast({
                    title: '邀请拒绝成功',
                    icon: 'none'
                  })
                },
                (err) => {
                  let title = ''
                  if (err === ResultMessage.ALREADY_CANCELED) {
                    title = '邀请已经被撤回'
                  } else {
                    title = '拒绝失败，请重试'
                  }
                  // 跳回
                  wx.navigateBack()

                  wx.showToast({
                    title: title,
                    icon: 'none'
                  })
                }
              )
            }
          }
        })
      },
      handleAccept (event) {
        this.dLog('handleAccept 方法调用', event)

        wx.showModal({
          title: '确定要接受这个邀请么？',
          success: (res) => {
            if (res.confirm) {
              this.dLog('确认接受', res)
              // api
              guideApi.acceptOrder(
                this.order.id,
                () => {
                  // 跳回
                  wx.navigateBack()

                  wx.showToast({
                    title: '接受成功 请耐心等待',
                    icon: 'none'
                  })
                },
                (err) => {
                  let title = ''
                  if (err === ResultMessage.ALREADY_CANCELED) {
                    title = '邀请已经被撤回'
                  } else {
                    title = '接受失败，请重试'
                  }
                  // 跳回
                  wx.navigateBack()

                  wx.showToast({
                    title: title,
                    icon: 'none'
                  })
                }
              )
            }
          }
        })
      }
    }
  }
</script>

<style scoped>

  #page {
    padding-top: 2em;
    padding-bottom: 5em;
  }

  #info-section {
    border-radius: 20px;
    border: solid #42b9704d;
    margin: 0 20px 0 20px;
    padding: 20px 0 20px 0;
    box-shadow: #42b9704d 0 0 5px;
  }

  .info-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    padding: 10px;
  }

  .title-span {
    font-weight: bold;
    width: 190px;
  }

  .value-span {
    width: 460px;
  }

  footer {
    text-align: right;
    padding: 0 20px 20px 20px;
    margin-top: 1em;
  }

  .op-btn {
    width: 200px;
    margin-left: 30px;
    display: inline-block;
    background-color: transparent;
    border: thin solid rgba(0, 0, 0, 0.7);
  }

</style>
<style scoped src="../../assets/style/d-a.css"></style>
