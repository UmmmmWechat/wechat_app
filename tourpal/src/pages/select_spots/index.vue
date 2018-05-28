/*
 在这里可以选择景点 
 首先是按关键字搜索出景点，然后选择它们
 可多选，可删除选择

 完成选择后，会将选择的 spot 作为一个数组存入 微信的 storage, key 为 selectedSpots， 并后退一个页面
 请在接下来的页面自行调用 getStorage获得选择的 spots

 IMPORTANT!!!!!!!!! 请在其他页面 获得spots之后，将其存储清除，避免下次使用时出错
*/
<template>
  <div>
    <div id="search">
        <icon type="search" size="20" color="black"/>
        <div style="margin-left:10rpx;color:black;">
          <input
          v-model="keyword"
          placeholder="搜索景点"
          confirm-type="search"
          @confirm="handleSearch"/>
        </div>     
    </div>


    <div id="selected-list">
      <div 
      v-for="spot in selectedSpots"
      :key="spot.id"
      class="selected-item">
        <div style="margin-right:4rpx;">
          {{ spot.name }}
        </div>
        <div @click="handleRemoveSpot(spot)">
          <icon type="cancel" size="20" color="red"></icon>
        </div>
      </div>
    </div>


    <div id="result-list">
        <div 
        v-for="spot in resultSpots"
        :key="spot.id"
        class="spot-item d-card">
          <div>
            <div >
              {{ spot.name }}
            </div>
            <div style=" color: gray; font-size:0.8em;">
              {{ spot.location.province + '-' + spot.location.city + '-' +spot.location.region }}
            </div>
            <div style="text-align:right; font-size: 0.8em;">
              <a
              class="d-a"
              @click="handleSelectSpot(spot)">
                  选择
              </a>
            </div>
          </div>
        </div>
    </div>


    <div id="btn-div">
      <button 
      size="mini" 
      style="margin:10rpx;"
      @click="handleCancel">
        取消
      </button>
      <button 
      size="mini" 
      style="margin:10rpx;" 
      type="primary"
      @click="handleSubmit">
        确定
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyword: '',
      resultSpots: [],
      selectedSpots: []
    }
  },
  mounted () {
    
  },
  methods: {
    handleSearch (event) {
      console.log(event);
      // 清空上一次搜索
      this.resultSpots = [];

      for (let i = 0; i < 10; i++) {
        this.resultSpots.push({
        id: i,
        name: 'testSpot' + i,
        location: {
          province: '江苏省',
          city: '南京市',
          region: '栖霞区'
        }
      })
      }
      // TODO: 调用 api 去搜索
    },
    handleSelectSpot (spot) {
      this.selectedSpots.push(spot);
      this.resultSpots.splice(
        this.resultSpots.findIndex(
          item => item.id === spot.id
        ),
        1
      )
    },
    handleRemoveSpot (spot) {
      this.resultSpots.push(spot);
      this.selectedSpots.splice(
        this.selectedSpots.findIndex(
          item => item.id === spot.id
        ),
        1
      )
    },
    handleSubmit () {
      if(this.selectedSpots.length === 0) {
        wx.showToast({
          title: '请至少选择一个景点',
          icon: 'none'
        })
        return;
      }
      const selectedSpots = this.selectedSpots;
      wx.setStorage({
        key: 'selectedSpots',
        data: selectedSpots,
        success: () => {
          this.handleCancel();
        },
        fail: () => {
          wx.showToast({
            title: '信息存储失败，请重试',
            icon: 'none'
          })
        }
      })
    },
    handleCancel () {
      wx.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style scoped>
#search {
  margin: 20rpx;
  padding: 20rpx;
  border: gray 1px solid;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

#result-list {
  padding: 20rpx;
  margin-bottom: 100rpx;
}

.spot-item {
  margin: 20rpx 0;
  padding: 20rpx;
  /* box-shadow: gray 0 0 1px; */ 
}

#selected-list {
  margin: auto;
  width: 700rpx;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.selected-item {
  margin: 10rpx;
  padding: 10rpx;
  background-color: rgba(0,0,0,0.05);
  border-radius: 10rpx;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  text-align: center;

  font-size: 16px;
  /* line-height: 20px; */
}

#btn-div {
  background-color: white;
  box-shadow: gray -1px 0 1px;
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 0;
  z-index: 100;
}
</style>
<style src="../../assets/style/d-card.css" scoped/>
<style src="../../assets/style/d-a.css" scoped/>