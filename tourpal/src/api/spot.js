import * as constant from "./const/spotConst";
import * as serverUrl from "./apiUrl";
import * as httpRequest from "./httpRequestApi";
import spotStub from "./spotStub";

const apiName = 'spotApi';

export default {

    /**
     * 打印信息的方法
     * @param {*} message 
     * @param {*} optionalParams 
     */
    dLog(message, ...optionalParams) {
        console.log(apiName, message, optionalParams);
    },

    /**
     * 根据定位查询景点
     * @param {} location 
     * @param {int} lastIndex
     * @param {*} resolve 
     * @param {*} reject 
     */
    querySpots(location, lastIndex, resolve, reject) {
        this.dLog('querySpots 方法请求', "location", location, `lastIndes: ${lastIndex}`);

        if (httpRequest.isTestMode) {
            spotStub.querySpots(location, lastIndex, resolve, reject);
        } else {
            // 发起网络请求
            var onSuccess = (suc) => {
                // 成功的返回信息中为 景点的数组
                this.dLog('服务器端取得景点成功', suc);

                const hasMoreSpot = lastIndex != constant.GET_ALL_TAG && suc.length == constant.SPOT_MAX_NUM;

                resolve({ spotList, hasMoreSpot });
            };
            var onFail = (fai) => {
                this.dLog('服务器端取得景点失败', fai);
                reject();
            };
            httpRequest.dRequest(
                serverUrl.GET_SPOTS_BY_LOCATION, {
                    location,
                    lastIndex
                },
                httpRequest.GET,
                onSuccess,
                onFail
            );
        }
    },

    /**
     * 通过关键词和城市获取 spots 的方法
     * @param {*} keyword 
     * @param {*} city 
     * @param {*} lastIndex 
     * @param {*} resolve 
     * @param {*} reject 
     */
    querySpotsByKeywordAndCity(keyword, city, lastIndex, resolve, reject) {
        this.dLog('querySpotsByKeywordAndCity 方法请求',
            "keyword", keyword, "city", city, `lastIndes: ${lastIndex}`);

        if (httpRequest.isTestMode) {
            spotStub.querySpotsByKeywordAndCity(keyword, city, lastIndex, resolve, reject);
        } else {
            // 发起网络请求
            var onSuccess = (suc) => {
                // 成功的返回信息中为 景点的数组
                this.dLog('服务器端取得景点成功', suc);

                const hasMoreSpot = lastIndex != constant.GET_ALL_TAG && suc.length == constant.SPOT_MAX_NUM;

                resolve({ spotList, hasMoreSpot });
            };
            var onFail = (fai) => {
                this.dLog('服务器端取得景点失败', fai);
                reject();
            };
            httpRequest.dRequest(
                serverUrl.GET_SPOTS_BY_KEYWORD_AND_CITY, {
                    keyword,
                    city,
                    lastIndex
                },
                httpRequest.GET,
                onSuccess,
                onFail
            );
        }
    },

    /**
     * 检查 location 是否在服务范围内的方法
     * @param {*} location 
     * @param {*} resolve 
     * @param {*} reject 
     */
    checkLocationAvailable(location, resolve, reject) {
        // TODO 前端方法
        this.dLog('querySpots 方法请求', "location", location);

        spotStub.checkLocationAvailable(location, resolve, reject);
    },

}