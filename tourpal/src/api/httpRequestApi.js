const BASE_URL = 'http://106.14.178.184:3000'
const POST = 'POST'
const GET = 'GET'
const dRequest = (url, data, method, onSuccess, onFail) => {
  console.log(`request ${url}`)
  console.log(`params:${JSON.stringify(data)}`)
  wx.request({
    url: BASE_URL + url,
    data: data,
    method: method,
    success: (res) => {
      console.log('httpRequest接受到回应', res)
      if (res) {
        if (res.statusCode !== 200) {
          onFail(res.data)
        } else {
          onSuccess(res.data)
        }
      } else {
        onFail(res)
      }
    },
    fail: onFail
  })
}

const mockSuccess = (onSuccess) => {
  setTimeout(onSuccess, 500)
}

const isTestMode = false

export {
  dRequest,
  mockSuccess,
  POST,
  GET,
  isTestMode
}
