import * as mockData from "./mock/tourist_mock_data";
import * as constant from "./../components/tourist/constant";
import { SPOT_MAX_NUM, GET_ALL_TAG } from "./const/spotConst";

const apiName = 'touristApiStub';

export default {

    /**
     * 打印信息的方法
     * @param {*} message 
     * @param {*} optionalParams 
     */
    dLog(message, ...optionalParams) {
        console.log(apiName, 'stub', message, optionalParams);
    },

    /**
     * 游客登录桩
     * @param {*} resolve 
     * @param {*} reject 
     */
    logInStub(resolve, reject) {
        this.dLog('logIn 方法请求');

        const touristId = mockData.mockTouristID;
        // 保存 游客ID
        wx.setStorage({
            key: constant.TOURIST_ID,
            data: touristId,
            success: () => {
                this.dLog('保存游客ID成功');
                resolve();
            },
            fail: () => {
                this.dLog('保存游客ID失败');
                reject();
            }
        })
    },

    /**
     * 根据定位查询景点桩
     * @param {} location
     * @param {int} lastIndex
     * @param {*} resolve 
     * @param {*} reject 
     */
    querySpots(location, lastIndex, resolve, reject) {
        this.dLog('querySpots 方法请求', "location", location, `lastIndes: ${lastIndex}`);

        const totalSize = 2 * SPOT_MAX_NUM;
        const getAll = lastIndex == GET_ALL_TAG;
        const hasMoreSpot = !getAll && lastIndex < totalSize;
        var spotList = [];

        if (hasMoreSpot) {
            var mockSpot = mockData.mockSpot;
            var size = getAll ? totalSize : totalSize - lastIndex;
            for (let i = 0; i < size; i++) {
                let spotItem = {
                    id: lastIndex + i + "",
                    name: mockSpot.name,
                    pictureUrl: mockSpot.pictureUrl,
                    introduction: mockSpot.introduction
                }
                spotList.push(spotItem);
            }
        }

        resolve({ spotList, hasMoreSpot });
    },

}