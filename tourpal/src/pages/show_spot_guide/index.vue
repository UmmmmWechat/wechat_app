<template>
  <div>
    <div id="head">
      
    </div>
    <div id="guide-list">
      <guide-profile-card
       v-for="guide in filteredGuides"
      :key="guide.id"
      :guide="guide"/>
    </div>
  </div>
</template>

<script>
import touristApi from '../../api/tourist'

import GuideProfileCard from '../../components/guide/GuideProfileCard'
export default {
  components: {
    GuideProfileCard
  },
  data () {
    return {
      guides: []
    }
  },
  computed: {
    filteredGuides () {
      return this.guides;
    }
  },
  mounted() {
    wx.getStorage({
    key: 'spot',
    success: (res) => {
      console.log(res.data);
      touristApi.queryGuideBySpot(
        res.data,
        (guides) => {
          console.log('查询成功')
          this.guides = guides;
        },
        (err) => {
          console.log(err);
        }
      )
    } 
   })
  }
}
</script>

<style>

</style>
