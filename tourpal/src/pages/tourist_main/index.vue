<template>
<div>
  <div id="head">
      <div>
        <span>欢迎&emsp;</span>
        <span
        class="underline-span"
        @click="handleToPersonCenter"
        >{{ touristName }}</span>
      </div>
      <div>
        <span>你所旅游的城市：</span>
        <div style="display:inline-block;">
        <picker 
        mode="region"
        @change="handleLocationChange"
        >
          <span
          class="underline-span" >
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
    <d-loading :loading="loading"/>
    <div 
    id="no-more-item" 
    :style="{display: hasMore ? 'none' : 'block'}">
    已经加载全部啦~
    </div>
  </scroll-view>
  
</div>
  
</template>


<script>
import SpotCard from '../../components/spot/SpotCard'
import DInput from '../../components/common/DInput'
import DLoading from '../../components/common/DLoading'
import touristApi from '../../api/tourist';
export default {
  components: {
    SpotCard,
    DInput,
    DLoading
  },
  data () {
    return {
      location: '南京',
      spots: [],
      touristName: '文向东',
      filter: '',
      loading: false,
      hasMore: true
    }
  },
  computed: {
    city () {
      return this.location.slice(this.location.lastIndexOf('-') + 1);
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
      if(this.filter !== '') return;
      if(this.loading) return;
      console.log("到达底部")
      if(this.spots.length > 30){
        this.hasMore = false;
        return;
      }
      this.loading = true;
      touristApi.querySpots(
        this.location,
        (res) => {
          setTimeout(
            () => {
              for(let key in res){
                this.spots.push(res[key]);
              }
              this.loading = false;
            },
            2000
          )
        },
        (err) => console.log(err)
        )
    },
    handleToPersonCenter (event) {
      console.log("跳转到个人中心")
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
.underline-span {
  text-decoration: underline;
}

#scroll {
  height: 1000rpx;
}

#no-more-item {
  color: #42b970;
  text-align: center;
}
</style>
