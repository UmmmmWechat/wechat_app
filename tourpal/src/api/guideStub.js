import * as mockData from "./mock/guide_mock_data";
import * as constant from "./../api/const/guideConst";

const apiName = 'guideApiStub';

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
     * 向导登录桩
     * @param {*} resolve 
     * @param {*} reject 
     */
    logInStub(resolve, reject) {
        this.dLog('logIn 方法请求');

        // 是否是 新的导游
        const isNewGuide = true;
        // const isNewGuide = false;
        if (isNewGuide) {
            this.dLog('新导游，需要进行注册');
            resolve({ isNewGuide: isNewGuide });
        } else {
            this.dLog('老导游，不需要进行注册');
            const guideId = mockData.mockGuide.id;
            // 保存 向导ID
            wx.setStorage({
                key: constant.GUIDE_ID,
                data: guideId,
                success: () => {
                    this.dLog('保存向导ID成功');
                    resolve({ isNewGuide: isNewGuide });
                },
                fail: () => {
                    this.dLog('保存向导ID失败');
                    reject();
                }
            })
        }
    },
}