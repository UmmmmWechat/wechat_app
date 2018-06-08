const BASE_URL = "https://www.wenxiangdong.cn";
const POST = "POST";
const GET = "GET";
var dRequest = (url, data, method, onSuccess, onFail) => {
    wx.request({
        url: BASE_URL + url,
        data: data,
        method: method,
        success: (res) => {
            if (res) {
                if (res.statusCode !== 200) {
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

const isTestMode = false;

export {
    dRequest,
    POST,
    GET,
    isTestMode
}
