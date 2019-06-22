<template>
  <div>
    212
  </div>
</template>

<script>
  import commonApi from '../../api/common'
  import spotApi from '../../api/spot'

  export default {
    mounted () {
      spotApi.querySpots({city: '广州市'}, 0,
        (res) => {
          console.log('querySpotsByKeyword suc', res);
        },
        (err) => {
          console.log('querySpotsByKeyword suc', err);
        })
    }
  }
</script>

<style>

</style>
