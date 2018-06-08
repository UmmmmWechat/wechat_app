/* 这是一些共同的会用到api */

import * as serverUrl from "./apiUrl";
import * as returnMessage from "./returnMessage";

export default {
  querySpotById(spotId, resolve, reject) {
    if (httpRequest.isTestMode) {

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
  queryGuideById(guideId, resolve, reject) {
    if (httpRequest.isTestMode) {

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
  queryOrderById(orderId, resolve, reject) {
    if (httpRequest.isTestMode) {

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
  },
}
