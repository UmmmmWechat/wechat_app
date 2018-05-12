<template>
<div>
    <guide-profile-card v-for="i in 10" :key="i"/>
    <progress :percent="89" show-info />
  <!-- </div> -->
</div>  
</template>

<script>
import DLoading from '../../components/common/DLoading'
import GuideProfileCard from '../../components/guide/GuideProfileCard'
export default {
  components: {
    DLoading,
    GuideProfileCard
  },
  data () {
    return {
      show: true
    }
  }
}
</script>

<style>

</style>
