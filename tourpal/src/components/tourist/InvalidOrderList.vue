<template>
    <div>
        <div>
            <picker
            mode="selector"
            :range="options"
            @change="handleChangeType">
              <span>{{ options[selectedTypeIndex] }}</span>
            </picker>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      options: ['已取消', '被婉拒', '过期'],
      selectedTypeIndex: 0,
      touristId: '',
      ordersArray: [
        [], [], []
      ],
      // loadingArray
    }
  },
  methods: {
    handleChangeType (event) {
      this.selectedTypeIndex = event.target.value
    }
  }
}
</script>
