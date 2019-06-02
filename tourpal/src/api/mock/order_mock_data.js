import {FINISHED_STATE, ONGOING_STATE, REJECTED_STATE, TIMEOUT_STATE, WAITING_STATE} from '../const/guideConst'

const createMockOrder = function (i, state) {
  return {
    id: `testOrderID${i}`,
    touristId: `testTouristID${i}`,
    guideId: `guideID${i}`,
    spotId: `spotID${i}`,
    generatedDate: createDate(),
    travelDate: createDate(),
    message: '老司机带我飞',
    state: state,
    cancelReason: null,
    feedback: {
      spotPoint: null,
      guidePoint: null,
      comment: null
    }
  }
}

const createDate = function () {
  return new Date().toLocaleDateString()
}

// 导游只需要以下五种类型的邀请
// resolve({
//   "finished": MOCK_ORDERS,
//   "waiting": MOCK_ORDERS,
//   "ongoing": MOCK_ORDERS,
//   "rejected": MOCK_ORDERS,
//   "timeout": MOCK_ORDERS
// });
const MOCK_ORDERS = [
  createMockOrder(0, FINISHED_STATE),
  createMockOrder(1, WAITING_STATE),
  createMockOrder(2, ONGOING_STATE),
  createMockOrder(3, REJECTED_STATE),
  createMockOrder(4, TIMEOUT_STATE)
]

export {
  MOCK_ORDERS,
  createMockOrder
}
