<template>
<div>
  <div id="head" class="d-head">
      <div>
        <span>欢迎&emsp;</span>
        <span
        class="underline-span"
        @click="handleToPersonCenter"
        >{{ touristName }}</span>
      </div>
      <div>
        <span>你所旅游的地点：</span>
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
          v-model="searchWord"
          placeholder="搜索景点"
          @on-focus="handleSearchFocus"
          @on-enter="handleSearch"/>
        </div>     
      </div>
    </div>

  <scroll-view
  v-if="!isSearch"
  class="scroll" 
  scroll-y
  scroll-with-animation
  enable-back-to-top
  @scrolltolower="handleGetMoreSpots">
    <div id="body">
    <spot-card
    v-for="spot in toShowSpots"
    :key="spot.id"
    :spot="spot"
    />
    </div>
    <d-loading :loading="loading"/>
    <div 
    id="no-more-item" 
    :style="{display: hasMore ? 'none' : 'block'}">
    已经加载全部啦~
    </div>
  </scroll-view>

  <scroll-view
  v-else 
  class="scroll d-search-list"
  scroll-y
  scroll-with-animation
  enable-back-to-top
  @scrolltolower="handleSearch">
    <div >
      <div 
      style="text-align:center;padding:10rpx;">
        <button 
        class="d-back-btn-white"
        size="mini"
        plain
        @click="handleClickBack">
          返回
        </button>
      </div>
    <spot-card
    v-for="spot in toShowSpots"
    :key="spot.id"
    :spot="spot"/>
    </div>
    <d-loading :loading="loading" color="white"/>
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
import touristApi from '../../api/tourist'
import spotApi from '../../api/spot'
export default {
  components: {
    SpotCard,
    DInput,
    DLoading
  },
  data () {
    return {
      location: {
        province: '江苏省',
        city: '南京市',
        region: '栖霞区'
      },
      spots: [],
      searchSpots: [],
      touristName: '文向东',
      filter: '',
      loading: false,
      hasMore: true,
      isSearch: false,
      searchWord: ''
    }
  },
  computed: {
    city () {
      var result = '';
      for (let key in this.location) {
        result = result + this.location[key] + '-'
      }
      return result.slice(0,result.length - 1);
    },
    toShowSpots () {
      if(this.isSearch){
        return this.searchSpots;
      } else {
        return this.spots;
      }
    }
  },
  mounted () {
    this.getSpots();
  },
  methods: {
    getSpots () {
      if (this.loading) return;
      if (!this.hasMore) return;
      this.loading = true;
      // 保留下上次最后的index
      let lastIndex = this.spots.length;
      console.log('get spots')
      touristApi.querySpots(
        this.location,
        lastIndex,
        (res) => {
          for (let key in res) {
            this.spots.push(res[key]);
          }
          this.loading = false;
          // 比较下
          if (lastIndex === this.spots.length){
            this.hasMore = false;
          }
        },
        (err) => {console.log(err);}
      )
    },
    handleLocationChange (event) {
      console.log(event);
      var value = event.target.value;
      this.location = {
        province: value[0],
        city: value[1],
        region: value[2]
      }
    },
    handleGetMoreSpots (event) {
      this.getSpots();
    },
    handleToPersonCenter (event) {
      console.log("跳转到个人中心")
    },
    handleSearchFocus (event) {
      this.isSearch = true;
    },
    handleSearch (event) {
      console.log('开始搜索')
      this.loading = true;
      spotApi.querySpotsByKeyword(
        this.searchWord,
        this.searchSpots.length,
        (res) => {
          for (let item in res) {
            this.searchSpots.push(res[item]);
          }
          this.loading = false;
        },
        (err) => {console.log(err);}
      )
    },
    handleClickBack (event) {
      this.searchWord = '';
      this.hasMore = true;
      this.isSearch = false;
      this.searchSpots = [];
    }
  }
}
</script>

<style scoped>
#head {
color: white;
font-size: 0.8em;
z-index: 100;
}
.underline-span {
  text-decoration: underline;
}

.scroll {
  height: 1000rpx;
}


#no-more-item {
  color: #42b970;
  text-align: center;
}

#back-btn {
  background-color: transparent;
  color: white;
  border-color: white;
}

@keyframes searchListAnimation {
  from { transform: translateY(-1000rpx); }  
  to { transform: translateY(0); }
}

</style>

<style scoped src="../../assets/style/d-head.css" />
<style scoped src="../../assets/style/d-search-list.css" />
<style scoped src="../../assets/style/d-btn.css"/>