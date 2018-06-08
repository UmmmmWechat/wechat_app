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
            {{ spot.name }}
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
import { D_SPOT_ID, D_SPOT_NAME } from '../../api/const/spotConst';
import { SHOW_SPOT_GUIDE } from '../../pages/pages_url';

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
            // 保存景点 ID
            wx.setStorage({
                key: D_SPOT_ID,
                data: this.spot.id,
                success: () => {
                    console.log(`SpotCard 保存 spot id 成功 ${this.spot.id}`);
                    
                    // 保存景点名称
                    wx.setStorage({
                        key: D_SPOT_NAME,
                        data: this.spot.name,
                        success: () => {
                            console.log(`SpotCard 保存 spot name 成功 ${this.spot.name}`);
                            const url = `/${SHOW_SPOT_GUIDE}`;
                            wx.navigateTo({ url });
                        }
                    }) 
                }
            });
        }
    },
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
    font-size: 1.2em;
    text-align: left;
    font-weight: bold;
    color: black;
    padding-bottom: 20rpx;
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