<template>
  <div>
    <!-- :style="{height: screenHeight + 'px'}" -->
      <div id="timeline-wrapper">
        <d-timeline :events="events"/>
      </div>
  </div>
</template>

<script>
import touristApi from '../../api/tourist'

import DLoading from '../../components/common/DLoading'
import DTimeline from '../../components/common/DTimeline'

export default {
  components: {
    DLoading,
    DTimeline
  },
  data () {
    return {
      orders: [],
      touristId: '',
      isLoading: false,
      hasMore: true,
      screenHeight: 1200
    }
  },
  computed: {
    events () {
      return this.orders.map(
        item => {
          return {
            date: item.travelDate,
            content: "content"
          }
        }
      )
    }
  },
  mounted() {
    wx.getStorage({
      key: 'touristId',
      success: (res) => {
        this.touristId = res.data;
        this.getOrders();
      }
    });
    wx.getSystemInfo({
      success: (res) => {
        console.log(res);
        this.screenHeight = res.screenHeight;
      }
    })
  },
  methods: {
    getOrders () {
      if(this.loading) return;
      if(!this.hasMore) return;
      this.loading = true;
        touristApi.queryOrders(
          this.touristId,
          'finished',
          -1,
          (orders) => {
            if(orders === undefined || orders.length === 0) {
              this.loading = false;
              this.hasMore = false;
            }
            for (let key in orders) {
              this.orders.push(orders[key]);
            }
            this.loading = false;
          },
          (err) => {}
        )
    }
  }
}
</script>

<style scoped>
#timeline-wrapper {
  margin: 40rpx 0;
}

</style>
