import * as constant from './../api/const/touristConst'
import * as serverUrl from './apiUrl'
import * as httpRequest from './httpRequestApi'
import * as returnMessage from './returnMessage'

import touristStub from './touristStub'
import { REJECTED } from './const/orderConst'

const apiName = 'touristApi'

export default {

    /**
     * 打印信息的方法
     * @param {*} message
     * @param {*} optionalParams
     */
  dLog (message, ...optionalParams) {
    console.log(apiName, message, optionalParams)
  },

    /**
     * 游客登录
     * @param {*} resolve
     * @param {*} reject
     * {
     *  touristId
     * }
     */
  logIn (resolve, reject) {
    this.dLog('logIn 方法请求')

    if (httpRequest.isTestMode) {
      touristStub.logInStub(resolve, reject)
    } else {
      wx.login({
        success: (res) => {
          this.dLog('登录成功！', res)

          if (res.code) {
                        // 发起网络请求
            var onSuccess = (touristId) => {
                            // 成功的返回信息中包含 touristId
              this.dLog('服务器端登录成功', touristId)

                            // 保存 游客ID
              wx.setStorage({
                key: constant.TOURIST_ID,
                data: touristId,
                success: () => {
                  this.dLog('保存游客ID成功')
                  resolve()
                },
                fail: () => {
                  this.dLog('保存游客ID失败')
                  reject()
                }
              })
            }
            var onFail = (fai) => {
              this.dLog('服务器端登录失败', fai)
              reject()
            }
            httpRequest.dRequest(
                            serverUrl.TOURIST_LOGIN, {
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
     * 根据景点查询向导
     * @param {*} spotId
     * @param {*} lastIndex
     * @param {*} resolve
     * @param {*} reject
     */
  queryGuideBySpot (spotId, lastIndex, resolve, reject) {
    this.dLog(`queryGuideBySpot 方法请求 spotId:${spotId} lastIndex:${lastIndex}`)

    if (httpRequest.isTestMode) {
      touristStub.queryGuideBySpot(spotId, lastIndex, resolve, reject)
    } else {
            // 发起网络请求
      var onSuccess = (suc) => {
                // 成功的返回信息中为 向导数组
        this.dLog('服务器端通过景点取得导游成功', suc)

        const hasMoreGuide = lastIndex != constant.GET_ALL_TAG && suc.length == constant.GUIDE_MAX_NUM

        resolve({ guideList: suc, hasMoreGuide })
      }

      var onFail = (fai) => {
        this.dLog('服务器端通过景点取得导游失败', fai)
        reject()
      }

      httpRequest.dRequest(
                serverUrl.GET_GUIDE_BY_SPOT_ID, {
                  spotId,
                  lastIndex
                },
                httpRequest.GET,
                onSuccess,
                onFail
            )
    }
  },

    /**
     * 根据关键词查找导游
     * @param {*} keyword
     * @param {*} lastIndex
     * @param {*} resolve
     * @param {*} reject
     */
  queryGuideByKeyword (keyword, lastIndex, resolve, reject) {
    this.dLog(`queryGuideByKeyword 方法请求 keyword:${keyword} lastIndex:${lastIndex}`)

    if (httpRequest.isTestMode) {
      touristStub.queryGuideByKeyword(keyword, lastIndex, resolve, reject)
    } else {
            // 发起网络请求
      var onSuccess = (suc) => {
                // 成功的返回信息中为 向导数组
        this.dLog('服务器端通过关键词搜索导游成功', suc)

        const hasMoreGuide = lastIndex != constant.GET_ALL_TAG && suc.length == constant.GUIDE_MAX_NUM

        resolve({ guideList: suc, hasMoreGuide })
      }

      var onFail = (fai) => {
        this.dLog('服务器端通过关键词搜索导游失败', fai)
        reject()
      }

      httpRequest.dRequest(
                serverUrl.GET_GUIDE_BY_KEYWORD, {
                  keyword,
                  lastIndex
                },
                httpRequest.GET,
                onSuccess,
                onFail
            )
    }
  },

    /**
     * 发起新邀请
     * @param {*} order
     * @param {*} formId
     * @param {*} resolve
     * @param {*} reject
     */
  newOrder (order, formId, resolve, reject) {
    this.dLog('queryGuideByKeyword 方法请求',
            'order: ', order, 'formId: ', formId)

    if (httpRequest.isTestMode) {
      touristStub.newOrderStub(order, formId, resolve, reject)
    } else {
            // 发起网络请求
      var onFail = (fai) => {
        this.dLog('服务器端通过关键词搜索导游失败', fai)
        reject()
      }

      var onSuccess = (suc) => {
        if (suc === returnMessage.SUCCESS) {
                    // 成功的返回信息中为 SUCCESS
          this.dLog('服务器端通过关键词搜索导游成功', suc)

          resolve()
        } else {
          onFail(suc)
        }
      }

      httpRequest.dRequest(
                serverUrl.TOURIST_NEW_ORDER, {
                  order,
                  formId
                },
                httpRequest.POST,
                onSuccess,
                onFail
            )
    }
  },

    /**
     * 游客根据关键字获取orders
     * @param {*} touristId
     * @param {*} keyword
     * @param {*} lastIndex
     * @param {*} resolve
     * @param {*} reject
     */
  queryOrdersByKeyword (touristId, keyword, lastIndex, resolve, reject) {
    this.dLog(`queryOrdersByKeyword 方法请求 touristId:${touristId} keyword:${keyword} lastIndex:${lastIndex}`)

    if (httpRequest.isTestMode) {
      touristStub.queryOrdersByKeywordStub(touristId, keyword, lastIndex, resolve, reject)
    } else {
            // 发起网络请求
      var onSuccess = (suc) => {
                // 成功的返回信息中为 邀请数组
        this.dLog('服务器端通过关键词搜索邀请成功', suc)

        const hasMoreOrder = lastIndex != constant.GET_ALL_TAG && suc.length == constant.ORDER_MAX_NUM

        resolve({ orderList: suc, hasMoreOrder })
      }

      var onFail = (fai) => {
        this.dLog('服务器端通过关键词搜索邀请失败', fai)
        reject()
      }

      httpRequest.dRequest(
                serverUrl.TOURIST_GET_ORDER_BY_KEYWORD, {
                  touristId,
                  keyword,
                  lastIndex
                },
                httpRequest.GET,
                onSuccess,
                onFail
            )
    }
  },

    /**
     * 通过状态取得邀请列表
     * @param {*} touristId
     * @param {*} state
     * @param {*} lastIndex
     * @param {*} resolve
     * @param {*} reject
     */
  queryOrders (touristId, state, lastIndex, resolve, reject) {
    this.dLog(`queryOrders 方法请求 touristId:${touristId} state:${state} lastIndex:${lastIndex}`)

    if (httpRequest.isTestMode) {
      touristStub.queryOrders(touristId, state, lastIndex, resolve, reject)
    } else {
            // 发起网络请求
      var onSuccess = (suc) => {
                // 成功的返回信息中为 邀请数组
        this.dLog('服务器端通过状态搜索邀请成功', suc)

        const hasMoreOrder = lastIndex != constant.GET_ALL_TAG && suc.length == constant.ORDER_MAX_NUM

        resolve({ orderList: suc, hasMoreOrder })
      }

      var onFail = (fai) => {
        this.dLog('服务器端通过状态搜索邀请失败', fai)
        reject()
      }

      httpRequest.dRequest(
                serverUrl.TOURIST_GET_ORDER_BY_STATE, {
                  touristId,
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
     * 取消一单
     * @param {*} orderId
     * @param {*} resolve
     * @param {*} reject
     */
  cancelOrders (orderId, resolve, reject) {
    this.dLog('cancel order 方法')
    if (httpRequest.isTestMode) {
      resolve('SUCCESS')
    } else {
      httpRequest.dRequest(
          serverUrl.TOURIST_CANCEL_ORDER,
        {
          orderId: orderId
        },
        httpRequest.POST,
          resolve,
          reject
        )
    }
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
  commendOrder (orderId, feedback, resolve, reject) {
    this.dLog('commend order 方法')
    if (httpRequest.isTestMode) {
      resolve('SUCCESS')
    } else {
      httpRequest.dRequest(
        serverUrl.TOURIST_COMMENT_ORDER,
        {
          orderId: orderId,
          feedback: feedback
        },
        httpRequest.POST,
        resolve,
        reject
      )
    }
  }

}
