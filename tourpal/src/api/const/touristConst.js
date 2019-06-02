import OrderState from '../../utils/OrderState'

const GUIDE_MAX_NUM = 10
const GET_ALL_TAG = -1

const TOURIST_ID = 'dTouristId'

// 邀请状态列表
const WAITING_STATE = 0
const ONGOING_STATE = 1
const FINISHED_STATE = 2
const INVALID_STATE = 3
const STATE_SIZE = 4
const STATE_MENU = ['等待中', '进行中', '已完成', '失效']
const STATES_ARRAY = [
  OrderState.WAITING,
  OrderState.ONGOING,
  OrderState.FINISHED,
  'INVALID'
]
const CANCELED_STATE = 0
const REJECTED_STATE = 1
const TIMEOUT_STATE = 2
const INVALID_STATE_SIZE = 3
const INVALID_STATE_MENU = ['取消', '拒绝', '超时']
const INVALID_STATE_ARRAY = [
  OrderState.CANCELED,
  OrderState.REJECTED,
  OrderState.TIMEOUT
]
const ORDER_MAX_NUM = 10

// 查看订单详情
const CHECK_SPOT = 'dCheckSpot'
const CHECK_GUIDE = 'dCheckGuide'

// 订单操作
const RATE_ORDER = 'dRateOrder'

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

  REJECTED_STATE,
  CANCELED_STATE,
  TIMEOUT_STATE,
  INVALID_STATE_SIZE,
  INVALID_STATE_MENU,
  INVALID_STATE_ARRAY,

  ORDER_MAX_NUM,
  CHECK_SPOT,
  CHECK_GUIDE,
  RATE_ORDER
}
