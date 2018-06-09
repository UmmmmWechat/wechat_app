<template>
  <div>
    <div id="head" class="d-head">
      <div>
        <span>欢迎&emsp;</span>
        <span
          class="underline_span"
          @click="handleGuideNameClicked">
          {{ guide.realName }}
        </span>
      </div>
    </div>

    <div id="body">
      <order-list-guide
        :type="guideType"
        :loading="loading"
        :hasMore="hasMore"
        :orders="orders"/>
    </div>
  </div>
</template>

<script>
import OrderListGuide from "../../components/order/OrderList"

import guideApi from '../../api/guide'

import { GUIDE_ID } from '../../api/const/guideConst';
import { STATES_ARRAY, WAITING_STATE } from '../../api/const/guideConst';
import { GUIDE_TYPE } from '../../api/const/orderConst';
import { mockGuide } from '../../api/mock/guide_mock_data';
import { GUIDE_CENTER } from '../pages_url';

export default {
  components: {
    OrderListGuide,
  },
  data() {
    return {
      guide: {},
      guideType: GUIDE_TYPE,
      orders: [],
      hasMore: true,
      loading: false,
      pageName: 'guide_main'
    }
  },
  mounted() {
    this.loading = false
    this.hasMore = true

    // 取得 向导ID
    this.guide.id = wx.getStorageSync(GUIDE_ID);
    if (!this.guide.id) {
      const errMsg = "向导ID获取失败";
      this.mountedError(errMsg, fai);
      return;
    }

    // 取得向导信息
    this.getUserInfo();
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
    getUserInfo() {
      this.dLog('getUserInfo 方法响应');

      guideApi.queryUserInfo(
        this.guide.id,
        (res) => {
          this.dLog("取得向导信息成功", res)
          this.guide = res;
          this.getOrders()
        },
        (rej) => {
          const errMsg = "粗错啦QWQ没有找到你的向导信息";
          this.mountedError(errMsg, rej);
          return;
        }
      )
    },
    getOrders() {
      this.dLog('getOrders 方法响应');

      if (this.loading){
        this.dLog("加载中 return");
        return;
      }
      if (!this.hasMore) {
        this.dLog("已经加载全部 return");
        return;
      }

      // 改为正在loading
      this.loading = false

      // 取得等待中的邀请
      guideApi.queryOrders(
        this.guide.id,
        STATES_ARRAY[WAITING_STATE],
        -1,
        (res) => {
          this.dLog('取得等待中的邀请完成', res)

          this.hasMore = res.hasMore

          for (let key in res.orderList) {
            this.orders.push(res.orderList[key])
          }

          this.loading = false
        },
        (err) => {
          const errMsg = '粗错啦QWQ没找到你的邀请'
          this.showErrorRoast(errMsg, err);

          this.loading = false
        })
    },
    handleGuideNameClicked(event) {
      this.dLog('跳转到向导的个人中心');
      const url = `/${GUIDE_CENTER}`;
      this.dLog('跳转', url);
      wx.switchTab({ url });
    }
  }

}
</script>

<style>
#head {
  color: white;
  z-index: 100;
}

.underline_span {
  text-decoration: underline;
}

</style>

<style scoped src="../../assets/style/d-head.css" />
<style scoped src="../../assets/style/d-search-list.css" />
<style scoped src="../../assets/style/d-btn.css"/>
