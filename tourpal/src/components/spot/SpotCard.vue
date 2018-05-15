<template>
  <div id="wrapper" class="d-card">
      <div id="img-wrapper">
          <img
          id="image" 
          :src="spot.pictureUrl" 
          alt="景点图片加载失败">
      </div>
      <div id="text-wrapper">
          <div id="title-div">
              {{ spot.title }}
          </div>
          <div id="content-div">
              {{ spot.introduction }}
          </div>
      </div>
      <div 
      v-if="!noAction"
      id="btn-wrapper">
              <a
              class="d-a"
              @click="handleClick">
                  感兴趣
              </a>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        spot: {
            type: Object,
            required: true
        },
        noAction: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClick (event) {
            wx.setStorage({
                key: 'spot',
                data: this.spot,
                success: () => {
                    wx.navigateTo({
                        url: '/pages/show_spot_guide/main'
                    })
                }
            })  
        }
    },
    mounted () {
        console.log(this.imageUrl)
    }
}
</script>

<style scoped>
#wrapper {
    margin: 20rpx;
    background-color: #fff;
}
#img-wrapper {
    text-align: center;
}
#image {
    width: 100%;
    height: 500rpx;
}
#text-wrapper {
    padding: 20rpx 30rpx;
    background-color: #fff;
}

#title-div {
    font-size: 1.5em;
    text-align: left;
    font-weight: bold;
    color: black;
}

#content-div {
    text-align:justify;
    color: gray;
}

#btn-wrapper {
    margin: 30rpx 10rpx 10rpx 10rpx;
    padding: 40rpx;
    text-align: right;
}
</style>

<style src="../../assets/style/d-card.css" scoped/>
<style src="../../assets/style/d-a.css" scoped/>