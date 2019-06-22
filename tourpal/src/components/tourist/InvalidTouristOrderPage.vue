<template>
  <div class="page">
    <div>
      <picker
        mode="selector"
        :range="menus"
        @change="handleChangeType">
        <div id="selector_div">
        <span style=" border: rgba(0,0,0,0.3) 1px solid; border-radius: 5px; padding: 2px 5px">
          <span class="title-span">类型：</span>
          {{ menus[current] }}
        </span>
        </div>
      </picker>
    </div>
    <div>
      <order-list-tourist
        :orders="ordersArray[current]"
        :loading="loadingArray[current]"
        :has-more="hasMoreArray[current]"
        @scrolltolower="queryOrders"/>
    </div>
  </div>
</template>

<script>
  import touristApi from '../../api/tourist'

  import DNavigatorBar from '../../components/common/DNavigatorBar'
  import OrderListTourist from '../../components/order/OrderList'

  import {INVALID_STATE_MENU, INVALID_STATE_ARRAY, TOURIST_ID} from '../../api/const/touristConst'
  import {MOCK_TOURIST_ID} from '../../api/mock/tourist_mock_data'
  import {WINDOW_HEIGHT} from '../../api/const/commonConst'

  export default {
    components: {
      DNavigatorBar,
      OrderListTourist
    },
    data () {
      return {
        scrollHeight: 400,
        touristId: MOCK_TOURIST_ID,
        menus: INVALID_STATE_MENU,
        current: 0,

        hasMoreArray: [
          true, true, true
        ],
        ordersArray: [
          [], [], []
        ],
        loadingArray: [
          false, false, false
        ],

        pageName: 'invalid_tourist_order_page'
      }
    },
    computed: {
      heightStyle () {
        return `height: ${this.scrollHeight - 50}px`
      }
    },
    mounted () {
      this.touristId = wx.getStorageSync(TOURIST_ID)
      this.current = 0

      this.hasMoreArray = [
        true, true, true
      ]

      this.ordersArray = [
        [], [], []
      ]

      this.loadingArray = [
        false, false, false
      ]

      this.scrollHeight = wx.getStorageSync(WINDOW_HEIGHT)

      this.queryOrders()
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
      queryOrders (...event) {
        this.dLog('queryOrders 方法响应', event)
        const index = this.current

        if (this.loadingArray[index]) {
          this.dLog('加载中 return')
          return
        }

        // 加载
        // this.loadingArray.splice(index, 1, true)
        // this.loadingArray = [...this.loadingArray]
        this.refreshLoadingArray(index, true)

        // 保留下上次最后的index
        let lastIndex = this.ordersArray[index].length
        this.dLog(this.touristId)

        touristApi.queryOrders(
          this.touristId,
          INVALID_STATE_ARRAY[index],
          lastIndex,
          (res) => {
            this.dLog('取得邀请列表成功', res)

            // this.hasMoreArray.splice(index, 1, res.hasMoreOrder)
            this.refreshHasMoreArray(index, res.hasMoreOrder)
            // this.loadingArray.splice(index, 1, false)
            this.refreshLoadingArray(index, false)
            res.orderList.forEach((order) => {
              this.ordersArray[index].push(order)
            })
          },
          (rej) => {
            this.showErrorToast('取得邀请列表失败', rej)
            // this.loadingArray.splice(index, 1, false)
            this.refreshLoadingArray(index, false)
          }
        )
      },
      refreshLoadingArray (idx, val) {
        this.loadingArray.splice(idx, 1, val)
        this.loadingArray = [...this.loadingArray]
      },
      refreshHasMoreArray (idx, val) {
        this.hasMoreArray.splice(idx, 1, val)
        this.hasMoreArray = [...this.hasMoreArray]
      },
      handleChangeType (event) {
        this.current = event.target.value
        this.queryOrders()
      }
    }
  }
</script>

<style scoped>
  .title-span {
    font-weight: bold;
    color: gray;
  }

  #selector_div {
    padding: 10px 40px;
    text-align: right;
    color: #42b970;
  }
</style>
