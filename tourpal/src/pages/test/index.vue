<template>
<div>
  <d-loading :loading="show"/>
  <button @click="show = !show">click me</button>
</div>  
</template>

<script>
import DLoading from '../../components/common/DLoading'
export default {
  components: {
    DLoading
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
