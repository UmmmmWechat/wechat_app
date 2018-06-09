import OrderState from '../../utils/OrderState'

const GUIDE_ID = "dGuideId";
const GUIDE_INFO = "dGuideInfo";
const INVITE_GUIDE_INFO = "inviteGuideInfo";
const GUIDE_LOGIN_CODE = "dGuideLoginCode"
const SELECTED_SPOTS = "dSelectedSpots";
const GET_ALL_TAG = -1;

// 邀请状态列表
const WAITING_STATE = 0;
const ONGOING_STATE = 1;
const FINISHED_STATE = 2;
const REJECTED_STATE = 3;
const TIMEOUT_STATE = 4;
const STATE_SIZE = 5;
const STATE_MENU = ['等待中', '进行中', '已完成', '拒绝', '超时'];
const STATES_ARRAY = [
    OrderState.WAITING,
    OrderState.ONGOING,
    OrderState.FINISHED,
    OrderState.REJECTED,
    OrderState.TIMEOUT
];
const ORDER_MAX_NUM = 10;

// 查看邀请
const SELECTED_ORDER_INFO = "selectedOrder";

export {
    GUIDE_ID,
    GUIDE_INFO,
    INVITE_GUIDE_INFO,
    GUIDE_LOGIN_CODE,
    SELECTED_SPOTS,

    WAITING_STATE,
    ONGOING_STATE,
    FINISHED_STATE,
    REJECTED_STATE,
    TIMEOUT_STATE,
    STATE_SIZE,
    STATE_MENU,
    STATES_ARRAY,
    ORDER_MAX_NUM,
    GET_ALL_TAG,

    SELECTED_ORDER_INFO
}