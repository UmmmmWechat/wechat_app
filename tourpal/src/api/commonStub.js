/* 这是一些共同的会用到api stub */
import {mockSpot} from './mock/spot_mock_data'
import {mockGuide} from './mock/guide_mock_data'
import {createMockOrder} from './mock/order_mock_data'
import {mockSuccess} from './httpRequestApi'

const apiName = 'commonApiStub'

export default {

  /**
   * 打印信息的方法
   * @param {*} message
   * @param {*} optionalParams
   */
  dLog (message, ...optionalParams) {
    console.log(apiName, 'stub', message, optionalParams)
  },

  /**
   * 通过id取得Spot的方法
   * @param {*} spotId
   * @param {*} resolve
   * @param {*} reject
   */
  querySpotById (spotId, resolve, reject) {
    this.dLog(`querySpotById 方法调用 spotId: ${spotId}`)

    // 直接返回
    mockSuccess(
      () => {
        resolve(mockSpot)
      }
    )
  },

  /**
   * 通过id取得导游的方法
   * @param {*} guideId
   * @param {*} resolve
   * @param {*} reject
   */
  queryGuideById (guideId, resolve, reject) {
    this.dLog(`queryGuideById 方法调用 guideId: ${guideId}`)

    // 直接返回
    mockSuccess(
      () => {
        resolve(mockGuide)
      }
    )
  },

  /**
   * 通过id取得邀请的方法
   * @param {*} orderId
   * @param {*} resolve
   * @param {*} reject
   */
  queryOrderById (orderId, resolve, reject) {
    this.dLog(`queryOrderById 方法调用 orderId: ${orderId}`)

    // 直接返回
    mockSuccess(
      () => {
        resolve(createMockOrder(0, 'state'))
      }
    )
  }
}
