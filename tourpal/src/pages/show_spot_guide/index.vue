<template>
  <div>
    <div id="head" class="d-head">
      <div id="title">{{ spot.title }}</div>
      <div id="search">
        <icon type="search" size="10" color="white"/>
        <!-- <div> -->
        <div style="display:inline-block;width:90%;">
          <d-input
          v-model="searchWord"
          placeholder="搜索向导"
          @on-focus="handleSearchFocus"
          @on-enter="handleSearch"
          />
        </div>     
      </div>
    </div>
    <scroll-view
    v-if="!isSearch" 
    id="guide-list"
    @scrolltolower="getGuides"
    scroll-y
    enable-back-to-top
    scroll-with-animation
    >
      <guide-profile-card
       v-for="guide in toShowGuides"
      :key="guide.id"
      :guide="guide"/>
      <d-loading :loading="loading" />
    </scroll-view>
    <scroll-view 
    v-else
    class="d-search-list"
    @scrolltolower="getGuides"
    scroll-y
    enable-back-to-top
    scroll-with-animation
    >
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
      <guide-profile-card
       v-for="guide in toShowGuides"
      :key="guide.id"
      :guide="guide"/>
      <d-loading :loading="loading" />
    </scroll-view>
  </div>
</template>

<script>
import touristApi from '../../api/tourist'

import GuideProfileCard from '../../components/guide/GuideProfileCard'
import DLoading from '../../components/common/DLoading'
import DInput from '../../components/common/DInput';
export default {
  components: {
    GuideProfileCard,
    DLoading,
    DInput
  },
  data () {
    return {
      spot: {},
      guides: [],
      searchGuides: [],
      loading: false,
      searchWord: '',
      isSearch: false
    }
  },
  computed: {
    toShowGuides () {
      return this.isSearch ? this.searchGuides : this.guides;
    }
  },
  mounted() {
    wx.getStorage({
    key: 'spot',
    success: (res) => {
      this.spot = res.data;
      this.getGuides()
    } 
   })
  },
  methods: {
    getGuides () {
      this.loading = true;
      touristApi.queryGuideBySpot(
        this.spot.id,
        this.guides.length,
        (guides) => {
          for (let key in guides) {
            this.guides.push(guides[key]);
          }
          this.loading = false;
        },
        (err) => {console.log(err)}
      )
    },
    handleSearchFocus (event) {
      this.isSearch = true;
    },
    handleClickBack (event) {
      this.isSearch = false;
      this.searchGuides = [];
      this.searchWord = '';
    },
    handleSearch (event) {
      this.loading = true;
      touristApi.queryGuideByKeyword(
        searchWord,
        (res) => {
          for (let key in item) {
            this.searchGuides.push(item[key]);
          }
          this.loading = false;
        },
        (err) => {console.log(err)}
      )
    }
  }
}
</script>

<style>
#guide-list {
  height: 1000rpx;
}


#title {
  text-align: left;
  font-size: 1.3em;
  font-weight: bold;
  color: white;
}

#search {
  margin: 20rpx 0;
  font-size: 0.8em; 
}
</style>

<style scoped src="../../assets/style/d-head.css"/>

<style scoped src="../../assets/style/d-search-list.css"/>

<style scoped src="../../assets/style/d-btn.css"/>