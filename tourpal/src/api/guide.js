import * as mockData from './mock/guide_mock_data'

import * as constant from './../api/const/guideConst'
import * as serverUrl from './apiUrl'
import * as returnMessage from './returnMessage'
import * as httpRequest from './httpRequestApi'

import guideStub from './guideStub'
import commonApi from './common'
import { MOCK_ORDERS } from './mock/order_mock_data'

const apiName = 'guideApi'

export default {

    /**
     * 打印信息的方法
     * @param {*} message
     * @param {*} optionalParams
     */
    dLog(message, ...optionalParams) {
        console.log(apiName, message, optionalParams)
    },

    /**
     * 打印错误信息的方法
     * @param {*} message
     * @param {*} optionalParams
     */
    dError(message, ...optionalParams) {
        console.error(apiName, message, optionalParams)
    },

    /**
     * 打印报错信息的方法
     * @param {*} message
     * @param {*} optionalParams
     */
    dError(message, ...optionalParams) {
        console.error(apiName, message, optionalParams)
    },

    /**
     * 导游登录
     * @param {*} resolve 返回 {isNewGuide:boolean}
     * @param {*} reject
     */
    logIn(resolve, reject) {
        this.dLog('logIn 方法请求')

        if (httpRequest.isTestMode) {
            guideStub.logInStub(resolve, reject)
        } else {
            wx.login({
                success: (res) => {
                    this.dLog('wx接口登录成功！', res)

                    if (res.code) {
                        // 发起网络请求
                        var onFail = (fai) => {
                            const errMsg = '服务器端登录失败'
                            this.dError(errMsg, fai)
                            reject({ errMsg, fai })
                        }

                        var onSuccess = (suc) => {
                            // 成功的返回信息中包含 guideId 和 message [NOT_REGISTER, SUCCESS]
                            this.dLog('服务器端登录成功', suc)

                            const message = suc.message

                            // 保存向导ID
                            wx.setStorageSync(constant.GUIDE_ID, suc.guideId)
                            this.dLog('保存向导ID成功')

                            // 检查是否是 新的导游
                            const isNewGuide = message == returnMessage.NOT_REGISTER
                            if (isNewGuide) {
                                // 没有找到这个导游 需要进行注册
                                this.dLog('新导游，需要进行注册')
                                resolve({
                                    isNewGuide: isNewGuide
                                })
                            } else if (message !== returnMessage.SUCCESS) {
                                onFail(suc)
                            } else {
                                // 找到了这个导游 保存 guideId 取得信息并保存
                                this.dLog('老导游，不需要进行注册')
                                resolve({
                                    isNewGuide: isNewGuide
                                })
                            }
                        }
                        httpRequest.dRequest(
                            serverUrl.GUIDE_LOGIN, {
                                code: res.code
                            },
                            httpRequest.POST,
                            onSuccess,
                            onFail
                        )
                    }
                },
                fail: (fai) => {
                    const errMsg = '登录失败！'
                    this.dError(errMsg, fai)
                    reject({ errMsg, fai })
                }
            })
        }
    },

    /**
     * 新向导注册的方法
     * @param {*} guide
     * @param {*} resolve
     * @param {*} reject
     */
    signUp(guide, resolve, reject) {
        this.dLog('sign up方法 guide: ', guide)
        if (httpRequest.isTestMode) {
            guideStub.signUp(guide, resolve, reject)
        } else {
            guide.id = wx.getStorageSync(constant.GUIDE_ID)
            if (!guide.id) {
                this.dError('未取得 guideId')
                const onSuccess = (suc) => {
                    guide.id = wx.getStorageSync(constant.GUIDE_ID)
                    this.requestSignUp(guide, resolve, reject)
                }
                const onFail = (fai) => {
                    const errMsg = 'sign up 请求失败'
                    this.dError(errMsg, fai)
                    reject({ errMsg, fai })
                }
                this.logIn(onSuccess, onFail)
            } else {
                this.requestSignUp(guide, resolve, reject)
            }
        }
    },

    /**
     * 发起注册请求的方法
     * @param {*} guide
     * @param {*} resolve
     * @param {*} reject
     */
    requestSignUp(guide, resolve, reject) {
        this.dLog('requestSignUp方法')

        var onFail = (fai) => {
            const errMsg = 'sign up 请求失败'
            this.dError(errMsg, fai)
            reject({ errMsg, fai })
        }

        var onSuccess = (suc) => {
            this.dLog('sign up 请求成功', suc)
            if (suc !== returnMessage.SUCCESS) {
                onFail(suc)
            } else {
                resolve()
            }
        }

        // 将spot换为spot
        guide.favorSpots = this.transSpotToSpotID(guide.favorSpots)

        httpRequest.dRequest(
            serverUrl.GUIDE_SIGN_UP, {
                guide
            },
            httpRequest.POST,
            onSuccess,
            onFail
        )
    },

    /**
     * 导游取得邀请列表的方法
     * @param {*} guideId
     * @param {*} state
     * @param {*} lastIndex
     * @param {*} resolve
     * @param {*} reject
     */
    queryOrders(guideId, state, lastIndex, resolve, reject) {
        this.dLog(`query orders by state 方法
         guideId: ${guideId} state: ${state} lastIndex: ${lastIndex}`)

        if (httpRequest.isTestMode) {
            guideStub.queryOrders(guideId, state, lastIndex, resolve, reject)
        } else {
            // 发起网络请求
            var onSuccess = (suc) => {
                // 成功的返回信息中为 邀请数组
                this.dLog('guide get orders by state 请求成功', suc)

                const hasMoreOrder = lastIndex != constant.GET_ALL_TAG && suc.length == constant.ORDER_MAX_NUM

                resolve({ orderList: suc, hasMoreOrder })
            }

            var onFail = (fai) => {
                this.dLog('guide get orders by state 请求失败', fai)
                reject(fai)
            }

            httpRequest.dRequest(
                serverUrl.GUIDE_GET_ORDER_BY_STATE, {
                    guideId,
                    state,
                    lastIndex
                },
                httpRequest.GET,
                onSuccess,
                onFail
            )
        }
    },

    /**
     * 通过一个受邀
     * @param {*} orderId
     * @param {*} resolve
     * @param {*} reject
     *
     */
    acceptOrder(orderId, resolve, reject) {
        this.dLog('accept order 方法')
        if (httpRequest.isTestMode) {
            resolve(returnMessage.SUCCESS)
        } else {
            httpRequest.dRequest(
                serverUrl.GUIDE_ACCEPT_ORDER, {
                    orderId: orderId
                },
                httpRequest.POST,
                (res) => {
                    this.dLog('guide accept order 请求成功', res)
                    resolve(res)
                },
                (err) => {
                    this.dError('guide accept order 请求失败', err)
                    reject(err)
                }
            )
        }
    },

    /**
     * 拒绝一个受邀
     * @param {*} orderId
     * @param {*} resolve
     * @param {*} reject
     */
    rejectOrder(orderId, resolve, reject) {
        this.dLog('reject order 方法')
        if (httpRequest.isTestMode) {
            resolve(returnMessage.SUCCESS)
        } else {
            httpRequest.dRequest(
                serverUrl.GUIDE_REJECT_ORDER, {
                    orderId: orderId
                },
                httpRequest.POST,
                (res) => {
                    this.dLog('guide reject order 请求成功', res)
                    resolve(res)
                },
                (err) => {
                    this.dError('guide reject order 请求失败', err)
                    reject(err)
                }
            )
        }
    },

    /**
     * 修改向导信息的方法
     * @param {Object} guide
     * @param {*} resolve
     * @param {*} reject
     */
    modifyUserInfo(guide, resolve, reject) {
        this.dLog('modify user info 方法', guide)
        if (httpRequest.isTestMode) {
            console.log('mock 修改向导信息', guide)
            mockData.mockGuide[0].wechat = guide.wechat
            mockData.mockGuide[0].phone = guide.phone
            mockData.mockGuide[0].introduction = guide.introduction
            mockData.mockGuide[0].favorSpots = guide.favorSpots
            resolve('SUCCESS')
        } else {

            const onFail = (fai) => {
                this.dError('modify user info 请求失败', fai)
                reject(fai)
            }

            // 将spot换为spot
            guide.favorSpots = this.transSpotToSpotID(guide.favorSpots)

            httpRequest.dRequest(
                serverUrl.MODIFY_GUIDE_INFO, {
                    guide
                },
                httpRequest.POST,
                (res) => {
                    if (res === returnMessage.SUCCESS) {
                        this.dLog('modify user info 请求成功', res)
                        resolve(res)
                    } else {
                        onFail(res)
                    }
                },
                onFail
            )
        }
    },

    /**
     * 获取向导信息的方法
     * @param {*} id
     * @param {*} resolve
     * @param {*} reject
     */
    queryUserInfo(id, resolve, reject) {
        this.dLog('query user info 方法 id:', id)
        if (httpRequest.isTestMode) {
            var guide = mockData.mockGuide
            resolve(guide)
        } else {
            httpRequest.dRequest(
                serverUrl.GET_GUIDE_INFO, {
                    guideId: id
                },
                httpRequest.GET,
                (res) => {
                    this.dLog('query user info 请求成功', res)
                    this.transSpotIDToSpot(res, resolve, reject)
                },
                (err) => {
                    this.dError('query user info 请求失败', err)
                    reject(err)
                }
            )
        }
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
    queryOrdersByKeyword(keyword, userId, lastIndex, resolve, reject) {
        // 导游只需要以下五种类型的邀请
        // resolve({
        //   "finished": MOCK_ORDERS,
        //   "waiting": MOCK_ORDERS,
        //   "ongoing": MOCK_ORDERS,
        //   "rejected": MOCK_ORDERS,
        //   "timeout": MOCK_ORDERS
        // });

        this.dLog('get orders by keyword 方法')
        if (httpRequest.isTestMode) {
            resolve(MOCK_ORDERS)
        } else {
            httpRequest.dRequest(
                serverUrl.GUIDE_GET_ORDER_BY_KEYWORD, {
                    keyword: keyword,
                    guideId: userId,
                    lastIndex: lastIndex
                },
                httpRequest.GET,
                (res) => {
                    this.dLog('get orders by keyword 请求成功', res)
                    resolve(res)
                },
                (err) => {
                    this.dError('get orders by keyword 请求失败', err)
                    reject(err)
                }
            )
        }
    },

    /**
     * 将spot数组转换为spotid数组
     * @param {*} favorSpots 
     */
    transSpotToSpotID(favorSpots) {
        this.dLog("transSpotToSpotID 方法调用", favorSpots)
        const favorSpotsID = []
        for (let key in favorSpots) {
            favorSpotsID.push(favorSpots[key].id)
        }
        this.dLog("transSpotToSpotID 转换后", favorSpotsID)
        return favorSpotsID
    },

    /**
     * 将spotid数组转换为spot数组
     * @param {*} guide 
     * @param {*} resolve 
     * @param {*} reject 
     */
    transSpotIDToSpot(guide, resolve, reject) {
        this.dLog("transSpotIDToSpot 方法调用", guide)

        let count = 0
        const length = guide.favorSpots.length
        let favorSpots = []

        let transSingleID = (id) => {
            commonApi.querySpotById(
                id,
                (res) => {
                    favorSpots.push(res)
                    count++

                    if (count < length) {
                        transSingleID(guide.favorSpots[count])
                    } else {
                        guide.favorSpots = favorSpots
                        this.dLog("transSpotIDToSpot 转换后", guide)
                        resolve(guide)
                    }
                },
                (rej) => {
                    // 取得景点信息出错
                    reject()
                }
            )
        }

        transSingleID(guide.favorSpots[count])
    }
}