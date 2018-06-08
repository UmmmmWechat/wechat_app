import * as httpRequest from "./httpRequestApi";
import * as serverUrl from "./apiUrl";
export default {
    queryOrderById(orderId, resolve, reject) {
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