<template>
<div>
  <div id="head">
      <div>
        <span>欢迎</span>
        <span>{{ touristName }}</span>
      </div>
      <div>
        <span>你所旅游的城市：</span>
        <div style="display:inline-block;">
        <picker 
        mode="region"
        @change="handleLocationChange"
        >
          <span
          @click="changeCity" 
          id="city-span">
          {{ city }}
          </span>
        </picker>
        </div>
        
      </div>
      <div id="search">
        <icon type="search" size="10" color="white"/>
        <div style="display:inline-block;width:90%;">
          <d-input
          v-model="filter"
          placeholder="搜索景点"/>
        </div>     
      </div>
    </div>
  
  <scroll-view
  id="scroll" 
  scroll-y
  scroll-with-animation
  @scrolltolower="handleGetMoreSpots">
    <div id="body">
    <spot-card
    v-for="(spot, index) in filteredSpots"
    :key="spot.title + index"
    :imageUrl="spot.pictureUrl"
    :title="spot.title"
    :content="spot.introduction"/>
    </div>
  </scroll-view>
</div>
  
</template>


<script>
import SpotCard from '../../components/spot/SpotCard'
import DInput from '../../components/common/DInput'
import touristApi from '../../api/tourist';
export default {
  components: {
    SpotCard,
    DInput
  },
  data () {
    return {
      location: '南京',
      spots: [],
      touristName: '文向东',
      filter: ''
    }
  },
  computed: {
    city () {
      return this.location
    },
    filteredSpots () {
      return this.spots.filter(
        item => item.title.indexOf(this.filter) !== -1
      ) 
    }
  },
  mounted () {
    this.getSpots();
  },
  methods: {
    getSpots () {
      touristApi.querySpots(
        this.location,
        (res) => {
          this.spots = res
        },
        (err) => {
          console.log(err);
        }
      )
    },
    handleLocationChange (event) {
      console.log(event);
      var value = event.target.value;
      this.location = value.reduce((x,y) => x + '-' + y);
    },
    handleGetMoreSpots (event) {
      console.log("到达底部")
      touristApi.querySpots(
        this.location,
        (res) => {
          for(let key in res){
            this.spots.push(res[key]);
          }
        },
        (err) => console.log(err)
        )
    }
  }
}
</script>

<style scoped>
#head {
padding: 20rpx;
background-color: #42b970;
color: white;
font-size: 0.8em;
}
#city-span {
  text-decoration: underline;
}

#scroll {
  height: 1000rpx;
}
</style>
