<template>
  <div id="wrapper" class="d-card">
      <div id="img-wrapper">
          <img
          id="image" 
          :src="imageUrl" 
          alt="景点图片加载失败">
      </div>
      <div id="text-wrapper">
          <div id="title-div">
              {{ title }}
          </div>
          <div id="content-div">
              {{ content }}
          </div>
      </div>
      <div id="btn-wrapper">
              <a
              id="btn-p" 
              @click="handleClick">
                  感兴趣
              </a>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        imageUrl: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    methods: {
        handleClick (event) {
            wx.setStorage({
                key: 'spot',
                data: this.title,
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
}
#btn-p {
    color: #42b970;
    text-align: right;
}
</style>

<style src="../../assets/style/d-card.css" scoped/>
