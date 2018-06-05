const BASE_URL = "http://localhost:3000";
const POST = "POST";
const GET = "GET";
var dRequest = (url, data, method, onSuccess, onFail) => {
    wx.request({
        url: BASE_URL + url,
        data: data,
        method: method,
        success: (res) => {
            if (res) {
                if (res.statusCode === 400 || res.statusCode === 500) {
                    onFail(res.data);
                } else {
                    onSuccess(res.data);
                }
            } else {
                onFail(res);
            }
        },
        fail: onFail
    })
}

const isTestMode = true;

export {
    dRequest,
    POST,
    GET,
    isTestMode
}