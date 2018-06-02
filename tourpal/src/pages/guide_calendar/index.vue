<template>
  <section>
    <section>
      <calendar/>
    </section>
  </section>
</template>

<script>
import Calendar from "../../components/guide/Calendar"
import GuideApi from "../../api/guide"

export default {
  components: {
    Calendar
  },
  data() {
    return {
      
      orders: []
    }
  },
  mounted() {
    this.getOrders()
  },
  methods: {
    getOrders() {
      GuideApi.queryOrders(
        'guideId',
        'waiting',
        -1,
        (res) => {
          this.orders = res
        },
        (err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
