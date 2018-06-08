const GUIDE_MAX_NUM = 10;
const GET_ALL_TAG = -1;

const TOURIST_ID = "dTouristId";

// 要求状态列表
const WAITING_STATE = 0;
const ONGOING_STATE = 1;
const INVALID_STATE = 2;
const FINISHED_STATE = 3;
const STATE_SIZE = 4;
const STATE_MENU = ['等待中', '进行中', '失效', '已完成'];
const STATES_ARRAY = ['waiting', 'ongoing', 'invalid', 'finished'];
const ORDER_MAX_NUM = 10;

export {
    TOURIST_ID,
    GUIDE_MAX_NUM,
    GET_ALL_TAG,
    WAITING_STATE,
    ONGOING_STATE,
    INVALID_STATE,
    FINISHED_STATE,
    STATE_SIZE,
    STATE_MENU,
    STATES_ARRAY,
    ORDER_MAX_NUM
}