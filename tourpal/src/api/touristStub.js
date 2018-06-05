import * as mockData from "./mock/tourist_mock_data";
import * as constant from "./../components/tourist/constant";

const apiName = 'touristApiStub';

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
     * 游客登录桩
     * @param {*} resolve 
     * @param {*} reject 
     */
    logInStub(resolve, reject) {
        this.dLog('logIn 方法请求');

        const touristId = mockData.mockTouristID;
        // 保存 游客ID
        wx.setStorage({
            key: constant.TOURIST_ID,
            data: touristId,
            success: () => {
                this.dLog('保存游客ID成功');
                resolve();
            },
            fail: () => {
                this.dLog('保存游客ID失败');
                reject();
            }
        })
    }

}