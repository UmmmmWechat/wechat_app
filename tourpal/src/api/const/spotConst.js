const SPOT_MAX_NUM = 10;
const GET_ALL_TAG = -1;

const NANJING_LOCATION = {
    province: '江苏省',
    city: '南京市'
};
const AVAILABLE_LOCATION_ARRAY = [
    NANJING_LOCATION
];
const AVAILABLE_LEVEL_PROMPT = [
    "支持",
    "暂不支持该省份",
    "暂不支持该城市",
    "暂不支持该城镇"
]

const D_SPOT_ID = "dSpotID";
const D_SPOT_NAME = "dSpotName";

export {
    SPOT_MAX_NUM,
    GET_ALL_TAG,
    AVAILABLE_LOCATION_ARRAY,
    AVAILABLE_LEVEL_PROMPT,
    D_SPOT_ID,
    D_SPOT_NAME
}