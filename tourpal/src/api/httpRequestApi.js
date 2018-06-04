const BASE_URL = "http://localhost:3000";
var dRequest = (url, data, method, onSuccess, onFail) => {
    wx.request({
        url: BASE_URL + url,
        data: data,
        method: method,
        success: (res) => {
            if (res.statusCode === 400 || res.statusCode === 500) {
                onFail(res.data);
            } else {
                onSuccess(res.data);
            }
        },
        fail: onFail
    })
}

export {
    dRequest
}