const apiName = 'orderApiStub';

export default {

    /**
     * 打印信息的方法
     * @param {*} message 
     * @param {*} optionalParams 
     */
    dLog(message, ...optionalParams) {
        console.log(apiName, 'stub', message, optionalParams);
    },

    /**
     * 
     * @param {String} id 
     * @param {Function} resolve 
     * @param {Function} reject 
     */
    queryTouristById(id, resolve, reject) {
        resolve({
            name: 'tourist'
        })
    },

    /**
     * 
     * @param {String} id 
     * @param {Function} resolve 
     * @param {Function} reject 
     */
    queryGuideById(id, resolve, reject) {
        resolve({
            realName: 'guide'
        })
    },

    /**
     * 
     * @param {String} id 
     * @param {Function} resolve 
     * @param {Function} reject 
     */
    querySpotById(id, resolve, reject) {
        resolve({
            name: 'spot'
        })
    },

}