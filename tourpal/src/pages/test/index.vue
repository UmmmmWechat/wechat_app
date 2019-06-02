<template>
  <div>
    <button @click="handleClick">测试</button>
    <picker
      mode="region"
      @change="handleLocationChange">
      <div>选择城市</div>
    </picker>
  </div>
</template>

<script>
  import guide from '../../api/guide'
  import DDatePicker from '../../components/common/DDatePicker'

  export default {
    components: {DDatePicker},
    methods: {
      handleLocationChange (event) {
        console.log(event)
      },
      handleClick () {
        guide.queryOngoingOrdersGroupByDate(
          1,
          (res) => {
            console.log(res)
          },
          err => {
            console.log(err)
          }
        )
      }
    }
  }
</script>

<style>

</style>
