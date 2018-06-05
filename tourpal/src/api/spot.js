var json = '[{"title": "\u592b\u5b50\u5e99", "pictureUrl": "https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/lvpics/pic/item/50da81cb39dbb6fdb42a24970824ab18972b370a.jpg", "introduction": "\u592b\u5b50\u5e99\u662f\u53e4\u5efa\u7b51\u4e0e\u73b0\u4ee3\u5316\u7684\u7ed3\u5408\uff0c\u9760\u8fd1\u79e6\u6dee\u6cb3\u4e00\u5e26\u7684\u5efa\u7b51\u6bd4\u8f83\u53e4\u6734\u3002\u665a\u4e0a\u591c\u8272\u7b3c\u7f69\u4f1a\u66f4\u6f02\u4eae\uff0c\u5750\u8239\u591c\u6e38\u79e6\u6dee\u6cb3\u666f\u8272\u5f88\u597d\u3002\u5468\u8fb9\u7684\u5c0f\u5403\u5f88\u591a\uff0c\u4e0d\u8fc7\u90fd\u4e0d\u592a\u6b63\u5b97\uff0c\u4f46\u9f99\u987b\u7cd6\u548c\u5510\u8bb0\u81ed\u8c46\u8150\u8fd8\u662f\u633a\u4e0d\u9519\u3002"},{"title": "\u4e2d\u5c71\u9675", "pictureUrl": "https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/lvpics/pic/item/f7246b600c338744ab001037510fd9f9d62aa0b7.jpg", "introduction": "\u4e2d\u5c71\u9675\u4f4d\u4e8e\u949f\u5c71\u98ce\u666f\u533a\uff0c\u5efa\u7b51\u5927\u6c14\u800c\u5e84\u4e25\uff0c\u6709\u5386\u53f2\u610f\u4e49\u3002\u4e2d\u5c71\u9675\u53f0\u9636\u5f88\u591a\uff0c\u4f46\u8def\u7a0b\u65b9\u4fbf\uff0c\u722c\u4e0a\u53bb\u540e\u89c6\u91ce\u5f88\u597d\u3002\u95e8\u7968\u662f\u514d\u8d39\u7684\uff0c\u5e73\u65f6\u4eba\u8fd8\u597d\u4f46\u662f\u8282\u5047\u65e5\u4eba\u592a\u591a\uff0c\u603b\u4f53\u6765\u8bf4\u662f\u5357\u4eac\u5f88\u9760\u8c31\u7684\u4e00\u4e2a\u666f\u70b9\u3002"},{"title": "\u5357\u4eac\u603b\u7edf\u5e9c", "pictureUrl": "https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/lvpics/pic/item/5fdf8db1cb134954762afd2b574e9258d1094a4c.jpg", "introduction": "\u98ce\u666f\u548c\u6c1b\u56f4\u90fd\u4e0d\u9519\uff0c\u5e73\u65f6\u6e38\u5ba2\u4e0d\u592a\u591a\u3002\u95e8\u7968\u76f8\u5bf9\u4e8e\u9762\u79ef\u800c\u8a00\u662f\u8d35\u7684\uff0c\u4f46\u80dc\u5728\u5185\u5bb9\u6bd4\u8f83\u4e30\u5bcc\uff0c\u4fdd\u5b58\u5f88\u5b8c\u5584\uff0c\u80fd\u770b\u5230\u7cbe\u5de7\u7684\u6c11\u56fd\u98ce\u5efa\u7b51\u3002\u5bf9\u5386\u53f2\u6709\u5174\u8da3\u7684\u9a74\u53cb\u4e0d\u80fd\u9519\u8fc7\uff0c\u8bf7\u4e2a\u5bfc\u6e38\u8bb2\u89e3\u5c31\u66f4\u597d\u4e86\u3002"}]'

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
                this.dLog('服务器端取得景点失败', suc);

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

    /**
     * 
     * @param {*} keyword 
     * @param {*} resolve 
     * @param {*} reject 
     */
    querySpotsByKeyword(keyword, lastIndex, resolve, reject) {
        var res = JSON.parse(json);
        setTimeout(
            () => resolve(res),
            1000
        )
    },

}