<template>
<div>
    <d-navigator-bar 
    :menus="menu"
    :current="current"
    @on-change="current = $event.target.value"/>
    <button open-type="getUserInfo" @getuserinfo="handleGetUserInfo">用户</button>
    <order-card-guide :order="order" />
    <order-card-tourist :order="order" />
    <d-timeline :events="events" />
</div>  
</template>

<script>
import DLoading from '../../components/common/DLoading'
import GuideProfileCard from '../../components/guide/GuideProfileCard'
import OrderCardTourist from '../../components/order/OrderCardTourist'
import OrderCardGuide from '../../components/order/OrderCardGuide'
import DNavigatorBar from '../../components/common/DNavigatorBar';
import DTimeline from '../../components/common/DTimeline'
export default {
  components: {
    DLoading,
    GuideProfileCard,
    OrderCardTourist,
    OrderCardGuide,
    DNavigatorBar,
    DTimeline
  },
  data () {
    return {
      show: true,
      order: {
        spotId: 'dd',
        guideId: 'dd',
        touristId: 'dd',
        generatedDate: new Date().toLocaleString(),
        travelDate: new Date().toLocaleString(),
        state: 'waiting'
      },
      menu: ['菜单一','菜单二','菜单三'],
      current: 0,
      events: []
    }
  },
  mounted () {
    wx.login(
      {
        success: (res) => {
          console.log(res);
        }
      }
    )
    for (let i = 0; i < 10; i++) {
      let content = '';
      for (let j = 0; j <= i; j++) {
        content += 'contentcontent'
      }
      let date = new Date().toLocaleString();
      this.events.push({
        date: date,
        content: content
      })
    }
  },
  methods: {
    handleGetUserInfo(event) {
      console.log(event)
    }
  }
}
</script>

<style>

</style>
