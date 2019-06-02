/* 这是一些共同的会用到api */
import * as serverUrl from './apiUrl'
import * as httpRequest from './httpRequestApi'

import commonStub from './commonStub'

const apiName = 'commonApi'

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
   * 通过id取得Spot的方法
   * @param {*} spotId
   * @param {*} resolve
   * @param {*} reject
   */
  querySpotById (spotId, resolve, reject) {
    this.dLog(`querySpotById 方法调用 spotId: ${spotId}`)
    if (httpRequest.isTestMode) {
      commonStub.querySpotById(spotId, resolve, reject)
    } else {
      httpRequest.dRequest(
        serverUrl.GET_SPOTS_BY_ID, {
          spotId: spotId
        },
        httpRequest.GET,
        resolve,
        reject
      )
    }
  },

  /**
   * 通过id取得导游的方法
   * @param {*} guideId
   * @param {*} resolve
   * @param {*} reject
   */
  queryGuideById (guideId, resolve, reject) {
    this.dLog(`queryGuideById 方法调用 guideId: ${guideId}`)
    if (httpRequest.isTestMode) {
      commonStub.queryGuideById(guideId, resolve, reject)
    } else {
      httpRequest.dRequest(
        serverUrl.GET_GUIDES_BY_ID, {
          guideId: guideId
        },
        httpRequest.GET,
        resolve,
        reject
      )
    }
  },

  /**
   * 通过id取得导游的方法
   * @param {*} guideId
   * @param {*} resolve
   * @param {*} reject
   */
  queryBasicGuideById (guideId, resolve, reject) {
    this.dLog(`queryBasicGuideById 方法调用 guideId: ${guideId}`)
    if (httpRequest.isTestMode) {
      commonStub.queryGuideById(guideId, resolve, reject)
    } else {
      httpRequest.dRequest(
        serverUrl.GET_GUIDES_BY_ID_BASIC, {
          guideId: guideId
        },
        httpRequest.GET,
        resolve,
        reject
      )
    }
  },

  /**
   * 通过id取得邀请的方法
   * @param {*} orderId
   * @param {*} resolve
   * @param {*} reject
   */
  queryOrderById (orderId, resolve, reject) {
    this.dLog(`queryOrderById 方法调用 orderId: ${orderId}`)
    if (httpRequest.isTestMode) {
      commonStub.queryOrderById(orderId, resolve, reject)
    } else {
      httpRequest.dRequest(
        serverUrl.GET_ORDERS_BY_ID, {
          orderId: orderId
        },
        httpRequest.GET,
        resolve,
        reject
      )
    }
  }
}
