const SPOT_MAX_NUM = 10
const GET_ALL_TAG = -1

const NANJING_LOCATION = {
  province: '江苏省',
  city: '南京市'
}
const BEIJING_LOCATION = {
  province: '北京市',
  city: '北京市'
}
const CHENGDU_LOCATION = {
  province: '四川省',
  city: '成都市'
}
const CHONGQING_LOCATION = {
  province: '重庆市',
  city: '重庆市'
}
const CHANGSHA_LOCATION = {
  province: '湖南省',
  city: '长沙市'
}
const GUANGZHOU_LOCATION = {
  province: '广东省',
  city: '广州市'
}
const HANGZHOU_LOCATION = {
  province: '浙江省',
  city: '杭州市'
}
const NANCHANG_LOCATION = {
  province: '江西省',
  city: '南昌市'
}
const SHANGHAI_LOCATION = {
  province: '上海市',
  city: '上海市'
}
const AVAILABLE_LOCATION_ARRAY = [
  BEIJING_LOCATION,
  NANJING_LOCATION,
  CHANGSHA_LOCATION,
  CHENGDU_LOCATION,
  CHONGQING_LOCATION,
  SHANGHAI_LOCATION,
  NANCHANG_LOCATION,
  HANGZHOU_LOCATION,
  GUANGZHOU_LOCATION
]
const AVAILABLE_LEVEL_PROMPT = [
  '支持',
  '暂不支持该省份',
  '暂不支持该城市',
  '暂不支持该城镇'
]

const D_SPOT_ID = 'dSpotID'
const D_SPOT_NAME = 'dSpotName'

export {
    SPOT_MAX_NUM,
    GET_ALL_TAG,
    AVAILABLE_LOCATION_ARRAY,
    AVAILABLE_LEVEL_PROMPT,
    D_SPOT_ID,
    D_SPOT_NAME
}
