import * as mockData from "./mock/guide_mock_data";

export default {

    guideLogin() {

    },

    /**
     * 查询是否是新的guide
     * @param {string} code 临时登陆凭证
     * @param {Function} resolve 
     * @param {Function} reject 
     */
    queryIfNew(code, resolve, reject) {
        // 将临时登陆凭证发给服务器 服务器传回 用户ID （不是新的guide）/null（是新的guide）
        // 是新的引路人，需要注册
        // resolve(true);
        // 不是新的引路人，直接跳转引路人主页
        resolve(false);
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
    signUp(form, resolve, reject) {
        resolve('success')
    },



    /**
     * 
     * @param {*} guideId 
     * @param {*} state 
     * @param {*} resolve 
     * @param {*} reject 
     */
    queryOrders(guideId, state, lastIndex, resolve, reject) {
        console.log('queryOrders', guideId, state, lastIndex)
        console.log(mockData)
        resolve(mockData.mockOrders)
    },

    /**
     * 通过一个受邀
     * @param {*} orderId 
     * @param {*} resolve 
     * @param {*} reject 
     * 
     */
    acceptOrder(orderId, resolve, reject) {

    },

    /**
     * 
     * @param {*} orderId 
     * @param {*} resolve 
     * @param {*} reject 
     */
    rejectOrder(orderId, resolve, reject) {

    },

    /**
     * 
     * @param {Object} info 
     * @param {*} resolve 
     * @param {*} reject 
     */
    modifyUserInfo(info, resolve, reject) {

    },

    /**
     * 
     * @param {*} id 
     * @param {*} resolve 
     * @param {*} reject 
     */
    queryUserInfo(id, resolve, reject) {
        resolve(mockData.mockGuide[0]);
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
    queryOrdersByKeyword(keyword, userId, resolve, reject) {
        resolve({
            "finished": mockData.mockOrders,
            "waiting": mockData.mockOrders,
            "ongoing": mockData.mockOrders,
            "invalid": mockData.mockOrders,
            "rejected": mockData.mockOrders,
            "canceled": mockData.mockOrders,
            "timeout": mockData.mockOrders
        });
    }






}