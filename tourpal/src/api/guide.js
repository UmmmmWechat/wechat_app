import * as mockData from './mock/guide_mock_data'

import * as constant from './../components/guide/constant'
import * as serverUrl from './apiUrl'
import * as returnMessage from './returnMessage'
import * as httpRequest from './httpRequestApi'

import guideStub from './guideStub'
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
                    this.dLog('登录成功！', res)

                    if (res.code) {
                        // 发起网络请求
                        var onSuccess = (suc) => {
                            // 成功的返回信息中包含 guideId 或 NOT_FOUND
                            this.dLog('服务器端登录成功', suc)

                            // 检查是否是 新的导游
                            const isNewGuide = suc == returnMessage.NOT_FOUND
                            if (isNewGuide) {
                                // 没有找到这个导游 需要进行注册
                                this.dLog('新导游，需要进行注册')
                                resolve({
                                    isNewGuide: isNewGuide
                                })
                            } else {
                                // 找到了这个导游 保存 guideId 取得信息并保存
                                this.dLog('老导游，不需要进行注册')
                                wx.setStorage({
                                    key: constant.GUIDE_ID,
                                    data: suc,
                                    success: () => {
                                        this.dLog('保存向导ID成功')
                                        resolve({
                                            isNewGuide: isNewGuide
                                        })
                                    },
                                    fail: () => {
                                        this.dLog('保存向导ID失败')
                                        reject()
                                    }
                                })
                            }
                        }
                        var onFail = (fai) => {
                            this.dLog('服务器端登录失败', fai)
                            reject()
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
                    this.dLog('登录失败！', fai)
                }
            })
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
        resolve(false)
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
        this.dLog('sign up方法')
        if (httpRequest.isTestMode) {

        } else {
            httpRequest.dRequest(
                serverUrl.GUIDE_SIGN_UP,
                form,
                httpRequest.POST,
                (res) => {
                    this.dLog('sign up 请求成功', res)
                    resolve(res)
                },
                (err) => {
                    this.dLog('sign up 请求失败', err)
                    reject(err)
                }
            )
        }
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
        "finished": MOCK_ORDERS,
        "waiting": MOCK_ORDERS,
        "ongoing": MOCK_ORDERS,
        "rejected": MOCK_ORDERS,
        "timeout": MOCK_ORDERS*/
        this.dLog('query orders by state 方法')
        if (httpRequest.isTestMode) {
            console.log('queryOrders', guideId, state, lastIndex)
            console.log(mockData)
            resolve(MOCK_ORDERS)
        } else {
            httpRequest.dRequest(
                serverUrl.GUIDE_GET_ORDER_BY_STATE, {
                    guideId: guideId,
                    state: state,
                    lastIndex: lastIndex
                },
                httpRequest.GET,
                (res) => {
                    this.dLog('guide get orders by state 请求成功', res)
                    resolve(res)
                },
                (err) => {
                    this.dLog('guide get orders by state 请求失败', err)
                    reject(err)
                }
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
            resolve('SUCCESS')
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
                    this.dLog('guide accept order 请求失败', err)
                    reject(err)
                }
            )
        }
    },

    /**
     *
     * @param {*} orderId
     * @param {*} resolve
     * @param {*} reject
     */
    rejectOrder(orderId, resolve, reject) {
        this.dLog('reject order 方法')
        if (httpRequest.isTestMode) {
            resolve('SUCCESS')
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
                    this.dLog('guide reject order 请求失败', err)
                    reject(err)
                }
            )
        }
    },

    /**
     *
     * @param {Object} info
     * @param {*} resolve
     * @param {*} reject
     */
    modifyUserInfo(info, resolve, reject) {
        this.dLog('modify user info 方法')
        if (httpRequest.isTestMode) {
            console.log('guide.js', '修改向导信息', info)
            var guide = mockData.mockGuide[0]
            guide.wechat = info.wechat
            guide.phone = info.phone
            guide.introduction = info.introduction
            guide.favorSpots = info.favorSpots
            resolve('SUCCESS')
        } else {
            httpRequest.dRequest(
                serverUrl.MODIFY_GUIDE_INFO, {
                    guide: info
                },
                httpRequest.POST,
                (res) => {
                    this.dLog('modify user info 请求成功', res)
                    resolve(res)
                },
                (err) => {
                    this.dLog('modify user info 请求失败', err)
                    reject(err)
                }
            )
        }
    },

    /**
     *
     * @param {*} id
     * @param {*} resolve
     * @param {*} reject
     */
    queryUserInfo(id, resolve, reject) {
        this.dLog('query user info 方法')
        if (httpRequest.isTestMode) {
            var guide = mockData.mockGuide[0]
            resolve(guide)
        } else {
            httpRequest.dRequest(
                serverUrl.GET_GUIDE_INFO, {
                    guideId: id
                },
                httpRequest.GET,
                (res) => {
                    this.dLog('query user info 请求成功', res)
                    resolve(res)
                },
                (err) => {
                    this.dLog('query user info 请求失败', err)
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
                    this.dLog('get orders by keyword 请求失败', err)
                    reject(err)
                }
            )
        }
    }
}