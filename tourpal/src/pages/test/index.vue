<template>
<div>
    <d-navigator-bar 
    :menus="menu"
    :current="current"
    @on-change="current = $event.target.value"/>
    <order-card-tourist :order="order" />
  <!-- </div> -->
</div>  
</template>

<script>
import DLoading from '../../components/common/DLoading'
import GuideProfileCard from '../../components/guide/GuideProfileCard'
import OrderCardTourist from '../../components/order/OrderCardTourist'
import DNavigatorBar from '../../components/common/DNavigatorBar';
export default {
  components: {
    DLoading,
    GuideProfileCard,
    OrderCardTourist,
    DNavigatorBar
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
      current: 0
    }
  }
}
</script>

<style>

</style>
