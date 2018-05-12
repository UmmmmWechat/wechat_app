export default {
    /**
     * 查询是否是新的guide
     * @param {string} id 
     * @param {Function} resolve 
     * @param {Function} reject 
     */
    queryIfNew (code, resolve, reject) {
        resolve(true);
    },

    /**
     * 
     * @param {*} form 
     * @param {*} resolve 
     * @param {*} reject 
     * form: {
        realName: '',
        idCard: '',
        gender: '',
        location: {},
        wechat: '',
        phone: ''
      }
     */
    signUp (form, resolve, reject) {
        resolve('success');
    },



    /**
     * 
     * @param {*} guideId 
     * @param {*} state 
     * @param {*} resolve 
     * @param {*} reject 
     */
    queryOrders (guideId, state, lastIndex, resolve, reject) {

    },

    /**
     * 通过一个受邀
     * @param {*} orderId 
     * @param {*} resolve 
     * @param {*} reject 
     * 
     */
    acceptOrder (orderId, resolve, reject) {

    },

    /**
     * 
     * @param {*} orderId 
     * @param {*} resolve 
     * @param {*} reject 
     */
    rejectOrder (orderId, resolve, reject) {

    },

    /**
     * 
     * @param {Object} info 
     * @param {*} resolve 
     * @param {*} reject 
     */
    modifyUserInfo (info, resolve, reject) {

    },

    /**
     * 
     * @param {*} id 
     * @param {*} resolve 
     * @param {*} reject 
     */
    queryUserInfo (id, resolve, reject) {

    },

    /**
     * 
     * @param {*} keyword 
     * @param {*} resolve 
     * @param {*} reject 
     * {
     *  "waiting":[{},{},{}],
     *  "ongoing":[{},{},{}],
     *  []
     * }
     */
    queryOrdersByKeyword (keyword, userId ,resolve, reject) {
        
    }






}