import * as mockData from "./mock/spot_mock_data";
import * as constant from "./const/spotConst";
import { setTimeout } from "timers";

const apiName = 'spotApiStub';

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
     * 根据定位查询景点桩
     * @param {} location
     * @param {int} lastIndex
     * @param {*} resolve 
     * @param {*} reject 
     */
    querySpots(location, lastIndex, resolve, reject) {
        this.dLog('querySpots 方法请求', "location", location, `lastIndes: ${lastIndex}`);

        const totalSize = 2 * constant.SPOT_MAX_NUM;
        const getAll = lastIndex == constant.GET_ALL_TAG;
        const hasMoreSpot = !getAll && lastIndex < totalSize;
        var spotList = [];

        if (hasMoreSpot) {
            var mockSpot = mockData.mockSpot;
            var size = getAll ?
                totalSize :
                (totalSize - lastIndex > constant.SPOT_MAX_NUM ?
                    constant.SPOT_MAX_NUM :
                    totalSize - lastIndex);
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

        setTimeout(
            () => {
                resolve({ spotList, hasMoreSpot });
            },
            300
        )
    },

    /**
     * 通过关键词和城市获取 spots 的方法桩
     * @param {*} keyword 
     * @param {*} city 
     * @param {*} lastIndex 
     * @param {*} resolve 
     * @param {*} reject 
     */
    querySpotsByKeywordAndCity(keyword, city, lastIndex, resolve, reject) {
        this.dLog('querySpotsByKeywordAndCity 方法请求',
            "keyword", keyword, "city", city, `lastIndes: ${lastIndex}`);

        const totalSize = 2 * constant.SPOT_MAX_NUM;
        const getAll = lastIndex == constant.GET_ALL_TAG;
        const hasMoreSpot = !getAll && lastIndex < totalSize;
        var spotList = [];

        if (hasMoreSpot) {
            var mockSpotList = mockData.mockSpotList;
            const length = mockSpotList.length;
            var size = getAll ?
                totalSize :
                (totalSize - lastIndex > constant.SPOT_MAX_NUM ?
                    constant.SPOT_MAX_NUM :
                    totalSize - lastIndex);
            for (let i = 0; i < size; i++) {
                var mockSpot = mockSpotList[i % length];
                let spotItem = {
                    id: lastIndex + i + "",
                    name: `${keyword}:${mockSpot.name}`,
                    pictureUrl: mockSpot.pictureUrl,
                    introduction: mockSpot.introduction
                }
                spotList.push(spotItem);
            }
        }

        setTimeout(
            () => {
                resolve({ spotList, hasMoreSpot });
            },
            300
        )
    },

    /**
     * 检查 location 是否在服务范围内的方法桩
     * @param {*} location 
     * @param {*} resolve 
     * @param {*} reject 
     */
    checkLocationAvailable(location, resolve, reject) {
        // TODO 前端方法
        this.dLog('querySpots 方法请求', "location", location);

        var isAvailable = false;
        var notAvailableLevel = 1;
        constant.AVAILABLE_LOCATION_ARRAY.forEach((loc) => {
            if (loc.province && location.province) { // 有省份要求
                if (loc.province !== location.province) {
                    return;
                } else {
                    if (loc.city && location.city) { // 有城市要求
                        if (loc.city !== location.city) {
                            notAvailableLevel = notAvailableLevel < 2 ? 2 : notAvailableLevel;
                            return;
                        } else {
                            if (loc.region && location.region) { // 有城镇要求
                                if (loc.region !== location.region) {
                                    notAvailableLevel = notAvailableLevel < 3 ? 3 : notAvailableLevel;
                                    return;
                                }
                            }
                        }
                    }
                }
            }
            isAvailable = true;
        })

        if (isAvailable) {
            resolve({ isAvailable });
        } else {
            resolve({ isAvailable, errMsg: constant.AVAILABLE_LEVEL_PROMPT[notAvailableLevel] });
        }
    },

}