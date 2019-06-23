<template>
  <div id="wrapper" class="d-card">
    <div id="img-wrapper">
      <img
        id="image"
        :src="spot.pictureUrl"
        alt="景点图片加载失败">
    </div>
    <div class="text-wrapper">
      <div id="title-div">
        {{ spot.name }}
      </div>
      <div v-if="!mini" id="content-div">
        {{ spot.introduction }}
      </div>
    </div>
    <div v-if="!mini" class="text-wrapper">
      <div class="text-item-wrapper">
        <span class="title-span">热度：</span>
        <!-- <span>{{ spot.popularity }}</span> -->
        <span>
          <DHot v-bind:hot="spot.popularity"/>
        </span>
      </div>
      <div class="text-item-wrapper">
        <span class="title-span">推荐指数：</span>
        <!-- <span>{{ computedLevel }}</span> -->
        <span>
          <DRating v-bind:rating="computedLevel"/>
        </span>
      </div>
    </div>
    <div
      v-if="!noAction"
      id="btn-wrapper">
      <a
        class="like-icon-before button-a d-a"
        @click="handleClick">
        感兴趣
      </a>
    </div>
  </div>
</template>

<script>
  import {D_SPOT_ID, D_SPOT_NAME} from '../../api/const/spotConst'
  import {SHOW_SPOT_GUIDE} from '../../pages/pages_url'
  import DRating from "../common/DRating"
  import DHot from "../common/DHot"

  export default {
    components: {
      DRating,
      DHot
    },
    props: {
      mini: {
        type: Boolean,
        default: false
      },
      spot: {
        type: Object,
        required: true
      },
      noAction: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      computedLevel () {
        return Math.round(this.spot.recommendLevel)
      }
    },
    methods: {
      handleClick () {
        // 保存景点 ID
        wx.setStorage({
          key: D_SPOT_ID,
          data: this.spot.id,
          success: () => {
            console.log(`SpotCard 保存 spot id 成功 ${this.spot.id}`)

            // 保存景点名称
            wx.setStorage({
              key: D_SPOT_NAME,
              data: this.spot.name,
              success: () => {
                console.log(`SpotCard 保存 spot name 成功 ${this.spot.name}`)
                const url = `/${SHOW_SPOT_GUIDE}`
                wx.navigateTo({url})
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  #wrapper {
    margin: 40px;
    border-radius: 20px;
    background-color: #fff;
  }

  #img-wrapper {
    text-align: center;
  }

  #image {
    width: 100%;
    height: 500px;
  }

  .text-wrapper {
    padding: 30px 40px;
    background-color: #fff;
  }

  #title-div {
    font-size: 1.2em;
    text-align: left;
    font-weight: bold;
    color: black;
    padding-bottom: 20px;
  }

  #content-div {
    text-align: justify;
    color: gray;
  }

  #btn-wrapper {
    margin: -50px 0px 10px 10px;
    padding: 40px;
    text-align: right;
  }

  .text-item-wrapper {
    padding: 4px 0;
  }

  .title-span {
    font-weight: bold;
  }
</style>
<style src="../../assets/style/d-card.css" scoped></style>
<style src="../../assets/style/d-a.css" scoped></style>
