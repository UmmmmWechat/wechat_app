const ORDER_INFO = 'tourpal.order.info'

const getOrderInfo = () => {
  return wx.getStorageSync(ORDER_INFO);
};

export default {
  setOrder (order) {
    if (order) {
      const orderInfo = {
        message: order.message,
        time: order.travelDate.getTime()
      };
      console.log('setOrder', order, orderInfo);
      wx.setStorageSync(ORDER_INFO, orderInfo);
    }
  },

  getOrderMessage () {
    const orderInfo = getOrderInfo();
    if (orderInfo) {
      return getOrderInfo().message;
    }
  },

  getOrderTravelDate () {
    const orderInfo = getOrderInfo();
    if (orderInfo) {
      const date = new Date(orderInfo.time);
      let time = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
      return time.map((t) => t < 10 ? `0${t}` : `${t}`).join('-');
    }
  },

  getOrderTravelTime () {
    const orderInfo = getOrderInfo();
    if (orderInfo) {
      const date = new Date(orderInfo.time);
      let time = [date.getHours(), date.getMinutes()];
      return time.map((t) => t < 10 ? `0${t}` : `${t}`).join(':');
    }
  }
}
