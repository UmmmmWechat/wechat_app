import * as mockData from "./mock/guide_mock_data";
import * as constant from "./../components/guide/constant";
import * as serverUrl from "./apiUrl";
import * as returnMessage from "./returnMessage";
import * as httpRequest from "./httpRequestApi";

const guideLoginUrl = 'https://test.com/onLogin';
const apiName = 'guideApi';
const isTestMode = true;

export default {

    /**
     * 打印信息的方法
     * @param {*} message 
     * @param {*} optionalParams 
     */
    dLog(message, ...optionalParams) {
        if (isTestMode) {
            console.log(apiName, 'stub', message, optionalParams);
        } else {
            console.log(apiName, message, optionalParams);
        }
    },

    /**
     * 向导登录桩
     * @param {*} resolve 
     * @param {*} reject 
     */
    logInStub(resolve, reject) {
        this.dLog('logIn 方法请求');

        const guideId = 'testGuideID';
        // 保存 向导ID
        wx.setStorage({
            key: constant.GUIDE_ID,
            data: guideId,
            success: () => {
                this.dLog('保存向导ID成功');
                resolve();
            },
            fail: () => {
                this.dLog('保存向导ID失败');
                reject();
            }
        })
    },

    /**
     * 导游登录
     * @param {*} resolve 返回 {isNewGuide:boolean}
     * @param {*} reject 
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
                        // 发起网络请求
                        var onSuccess = (suc) => {
                            // 成功的返回信息中应包含 touristId
                            this.dLog('服务器端登录成功', suc);

                            // 保存 向导ID
                            if (suc.touristId) {
                                wx.setStorage({
                                    key: constant.TOURIST_ID,
                                    data: suc.touristId,
                                    success: () => {
                                        this.dLog('保存向导ID成功');
                                        resolve();
                                    },
                                    fail: () => {
                                        this.dLog('保存向导ID失败');
                                        reject();
                                    }
                                })
                            } else {
                                this.dLog('从服务器端取得向导ID失败');
                                reject();
                            }
                        };
                        var onFail = (fai) => {
                            this.dLog('服务器端登录失败', fai);
                            reject();
                        }
                        httpRequest.dRequest(
                            serverUrl.TOURIST_LOGIN, {
                                code: res.code
                            },
                            "POST",
                            onSuccess,
                            onFail
                        );
                    }
                },
                fail: (fai) => {
                    this.dLog('登录失败！', fai);
                }
            });
        }
    },

    /**
     * 准备丢弃
     * 查询是否是新的guide
     * @param {string} code 临时登陆凭证
     * @param {Function} resolve 
     * @param {Function} reject 
     */
    queryIfNew(code, resolve, reject) {
        // 将临时登陆凭证发给服务器 服务器传回 用户ID （不是新的guide）/null（是新的guide）
        // 是新的引路人，需要注册
        // resolve(true);
        // 不是新的引路人，直接跳转引路人主页
        resolve(false);
    },

    /**
     * 
     * @param {*} form 
     * @param {*} resolve 
     * @param {*} reject 
     * form: {
        realName: '',
        idCard: '',
        gender: '',
        location: {},
        wechat: '',
        phone: ''
      }
     */
    signUp(form, resolve, reject) {
        resolve('success')
    },



    /**
     * 
     * @param {*} guideId 
     * @param {*} state 
     * @param {*} resolve 
     * @param {*} reject 
     */
    queryOrders(guideId, state, lastIndex, resolve, reject) {
        /* 导游只有以下类型有效
        "finished": mockData.mockOrders,
        "waiting": mockData.mockOrders,
        "ongoing": mockData.mockOrders,
        "rejected": mockData.mockOrders,
        "timeout": mockData.mockOrders*/
        console.log('queryOrders', guideId, state, lastIndex)
        console.log(mockData)
        resolve(mockData.mockOrders)
    },

    /**
     * 通过一个受邀
     * @param {*} orderId 
     * @param {*} resolve 
     * @param {*} reject 
     * 
     */
    acceptOrder(orderId, resolve, reject) {

    },

    /**
     * 
     * @param {*} orderId 
     * @param {*} resolve 
     * @param {*} reject 
     */
    rejectOrder(orderId, resolve, reject) {

    },

    /**
     * 
     * @param {Object} info 
     * @param {*} resolve 
     * @param {*} reject 
     */
    modifyUserInfo(info, resolve, reject) {
        console.log("guide.js", "修改向导信息", info)
        var guide = mockData.mockGuide[0]
        guide.wechat = info.wechat
        guide.phone = info.phone
        guide.introduction = info.introduction
        guide.favorSpots = info.favorSpots
        resolve({
            guide: guide
        })
    },

    /**
     * 
     * @param {*} id 
     * @param {*} resolve 
     * @param {*} reject 
     */
    queryUserInfo(id, resolve, reject) {
        var guide = mockData.mockGuide[0]
        resolve(guide)
    },

    /**
     * 
     * @param {*} keyword 
     * @param {*} resolve 
     * @param {*} reject 
     * {
     *  "finished":[{},{},{}],
     *  "waiting":[{},{},{}],
     *  "ongoing":[{},{},{}],
     *  "rejected":[{},{},{}],
     *  "timeout":[{},{},{}],
     * }
     */
    queryOrdersByKeyword(keyword, userId, resolve, reject) {
        // 导游只需要以下五种类型的邀请
        resolve({
            "finished": mockData.mockOrders,
            "waiting": mockData.mockOrders,
            "ongoing": mockData.mockOrders,
            "rejected": mockData.mockOrders,
            "timeout": mockData.mockOrders
        });
    }






}