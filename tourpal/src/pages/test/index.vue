<template>
<div>
    <button @click="handleClick">测试</button>
</div>
</template>

<script>
import guide from '../../api/guide'

export default {
  methods: {
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
