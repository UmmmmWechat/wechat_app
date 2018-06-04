var json = '{"name": "\u592b\u5b50\u5e99", "pictureUrl": "https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/lvpics/pic/item/50da81cb39dbb6fdb42a24970824ab18972b370a.jpg", "introduction": "\u592b\u5b50\u5e99\u662f\u53e4\u5efa\u7b51\u4e0e\u73b0\u4ee3\u5316\u7684\u7ed3\u5408\uff0c\u9760\u8fd1\u79e6\u6dee\u6cb3\u4e00\u5e26\u7684\u5efa\u7b51\u6bd4\u8f83\u53e4\u6734\u3002\u665a\u4e0a\u591c\u8272\u7b3c\u7f69\u4f1a\u66f4\u6f02\u4eae\uff0c\u5750\u8239\u591c\u6e38\u79e6\u6dee\u6cb3\u666f\u8272\u5f88\u597d\u3002\u5468\u8fb9\u7684\u5c0f\u5403\u5f88\u591a\uff0c\u4e0d\u8fc7\u90fd\u4e0d\u592a\u6b63\u5b97\uff0c\u4f46\u9f99\u987b\u7cd6\u548c\u5510\u8bb0\u81ed\u8c46\u8150\u8fd8\u662f\u633a\u4e0d\u9519\u3002"}'
var spot = JSON.parse(json);
var mockGuide = function(i) {
    return {
        id: i,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526121882561&di=c15bfa3211e5ac3187be885db53016d4&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2Fa054478cfce531e62c1bb5a122ed71f6193533d7.jpg',
        name: '文向东' + i,
        age: 18 + i,
        gender: '男',
        goodFeedbackRate: 80 + i,
        wechat: 'ericlpl',
        phone: '112232323'
    }
}

const touristLoginUrl = 'https://test.com/onLogin';
const apiName = 'touristApi';
const isTestMode = true;

import * as constant from "./../components/tourist/constant";

export default {

    dLog(message, ...optionalParams) {
        console.log(apiName, message, optionalParams);
    },

    stubLog(message, ...optionalParams) {
        console.log(apiName, 'stub', message, optionalParams);
    },

    /**
     * 游客登录桩
     * @param {*} resolve 
     * @param {*} reject 
     */
    logInStub(resolve, reject) {
        this.stubLog('logIn 方法请求');

        const touristId = 'testTouristID';
        // 保存 游客ID
        wx.setStorage({
            key: constant.TOURIST_ID,
            data: touristId,
            success: () => {
                this.stubLog('保存游客ID成功');
                resolve();
            },
            fail: () => {
                this.stubLog('保存游客ID失败');
                reject();
            }
        })
    },

    /**
     * 游客登录
     * @param {*} resolve 
     * @param {*} reject 
     * {
     *  touristId
     * }
     */
    logIn(resolve, reject) {
        this.dLog('logIn 方法请求');

        if (isTestMode) {
            this.logInStub(resolve, reject);
        } else {
            wx.login({
                success: (res) => {
                    this.dLog('登录成功！', res);

                    if (res.code) {
                        // TODO 发起网络请求
                        wx.request({
                            url: touristLoginUrl,
                            data: {
                                code: res.code
                            },
                            method: POST,
                            success: (suc) => {
                                // 成功的返回信息中应包含 touristId
                                this.dLog('服务器端登录成功', suc);

                                // 保存 游客ID
                                if (suc.touristId) {
                                    wx.setStorage({
                                        key: constant.TOURIST_ID,
                                        data: suc.touristId,
                                        success: () => {
                                            this.dLog('保存游客ID成功');
                                            resolve();
                                        },
                                        fail: () => {
                                            this.dLog('保存游客ID失败');
                                            reject();
                                        }
                                    })
                                } else {
                                    this.dLog('从服务器端取得游客ID失败');
                                    reject();
                                }
                            },
                            fail: (fai) => {
                                this.dLog('服务器端登录失败', fai);
                                reject();
                            }
                        })
                    }
                },
                fail: (fai) => {
                    this.dLog('登录失败！', fai);
                }
            });
        }
    },

    /**
     * 根据定位查询景点
     * @param {} location 
     * @param {int} lastIndex
     * @param {*} resolve 
     * @param {*} reject 
     */
    querySpots(location, lastIndex, resolve, reject) {
        console.log(location);
        var result = JSON.parse(json);
        var list = []
        if (lastIndex > 10) {
            resolve(list);
        }
        for (let i = lastIndex; i < lastIndex + 5; i++) {
            let item = {
                id: i,
                name: result.name,
                pictureUrl: result.pictureUrl,
                introduction: result.introduction
            }
            list.push(item)
        }
        setTimeout(
            () => resolve(list),
            500
        )

    },

    /**
     * 根据景点查询向导
     * @param {String} spotId 景点ID
     * @param {*} resolve 
     * @param {*} reject 
     */
    queryGuideBySpot(spotId, lastIndex, resolve, reject) {
        console.log('in tourist api:' + spotId);
        var res = []
        for (let i = lastIndex; i < lastIndex + 5; i++) {
            res.push(mockGuide(i));
        }
        setTimeout(
            () => resolve(res),
            1000
        )

    },

    /**
     * 根据关键词查找导游
     * @param {*} keyword 
     * @param {*} resolve 
     * @param {*} reject 
     */
    queryGuideByKeyword(keyword, resolve, reject) {

    },


    /**
     * 邀请 guide
     * @param {String} guideId 
     * @param {String} spotId 
     * @param {String} touristId 
     * @param {Function} resolve 
     * @param {Function} reject
     * {
     *  orderId
     * }
     */
    inviteGuide(guideId, spotId, touristId, resolve, reject) {

    },

    /**
     * 
     * @param {String} touristId 
     * @param {String} state
     * @param {Function} resolve 
     * @param {Function} reject 
     */
    queryOrders(touristId, state, lastIndex, resolve, reject) {
        console.log('query orders' + state);
        var res = [];
        for (let i = 0; i < 5; i++) {
            res.push({
                id: state + i,
                touristId: i,
                guideId: i,
                spotId: i,
                state: state,
                generatedDate: new Date().toLocaleDateString(),
                travelDate: new Date().toLocaleDateString()
            })
        }
        setTimeout(
            () => resolve(res),
            1000
        )
    },

    /**
     * 取消一单
     * @param {*} orderId 
     * @param {*} resolve 
     * @param {*} reject 
     */
    cancelOrders(orderId, resolve, reject) {

    },


    /**
     * 评价一单
     * @param {*} orderId 
     * @param {Object} feedback 
     * @param {*} resolve 
     * @param {*} reject
     * feedback: {
        spotPoint: int
        guidePoint: int
        comment: String
        } 
     */
    commendOrder(orderId, feedback, resolve, reject) {

    },

    /**
     * 
     * @param {*} keyword 
     * @param {*} resolve 
     * @param {*} reject 
     */
    queryOrdersByKeyword(keyword, userId, resolve, reject) {

    },

    /**
     * 
     * @param {*} id 
     * @param {*} resolve 
     * @param {*} reject 
     */
    queryTouristById(id, resolve, reject) {
        resolve(mockGuide(id));
    },

    queryGuideById(id, resolve, reject) {
        resolve(mockGuide(id));
    },

    querySpotById(id, resolve, reject) {
        resolve(spot);
    }

}