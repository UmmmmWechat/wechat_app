import * as mockData from "./mock/tourist_mock_data";
import * as constant from "./../components/tourist/constant";
import { createMockGuide } from "./mock/guide_mock_data";

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

        const touristId = mockData.MOCK_TOURIST_ID;
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
    },

    /**
     * 根据景点查询向导
     * @param {String} spotId 景点ID
     * @param {*} resolve 
     * @param {*} reject 
     */
    queryGuideBySpot(spotId, lastIndex, resolve, reject) {
        this.dLog(`queryGuideBySpot 方法请求 spotId:${spotId} lastIndex:${lastIndex}`);

        const totalSize = 2 * constant.GUIDE_MAX_NUM;
        const getAll = lastIndex == constant.GET_ALL_TAG;
        const hasMoreGuide = !getAll && lastIndex < totalSize;
        var guideList = [];

        if (hasMoreGuide) {
            var size = getAll ?
                totalSize :
                (totalSize - lastIndex > constant.GUIDE_MAX_NUM ?
                    constant.GUIDE_MAX_NUM :
                    totalSize - lastIndex);

            for (let i = 0; i < size; i++) {
                let mockGuide = createMockGuide(i + lastIndex);
                guideList.push(mockGuide);
            }
        }

        setTimeout(
            () => {
                resolve({ guideList, hasMoreGuide });
            },
            300
        );
    },

    /**
     * 根据关键词查找导游
     * @param {*} keyword 
     * @param {*} lastIndex 
     * @param {*} resolve 
     * @param {*} reject 
     */
    queryGuideByKeyword(keyword, lastIndex, resolve, reject) {
        this.dLog(`queryGuideByKeyword 方法请求 keyword:${keyword} lastIndex:${lastIndex}`);

        const totalSize = 2 * constant.GUIDE_MAX_NUM;
        const getAll = lastIndex == constant.GET_ALL_TAG;
        const hasMoreGuide = !getAll && lastIndex < totalSize;
        var guideList = [];

        if (hasMoreGuide) {
            var size = getAll ?
                totalSize :
                (totalSize - lastIndex > constant.GUIDE_MAX_NUM ?
                    constant.GUIDE_MAX_NUM :
                    totalSize - lastIndex);

            for (let i = 0; i < size; i++) {
                let mockGuide = createMockGuide(i + lastIndex);
                mockGuide.name = `${keyword}:${mockGuide.name}`;
                guideList.push(mockGuide);
            }
        }

        setTimeout(
            () => {
                resolve({ guideList, hasMoreGuide });
            },
            300
        );
    },

    /**
     * 发起新邀请
     * @param {*} order 
     * @param {*} formId 
     * @param {*} resolve 
     * @param {*} reject 
     */
    newOrderStub(order, formId, resolve, reject) {
        this.dLog("queryGuideByKeyword 方法请求",
            "order: ", order, "formId: ", formId);

        // 直接返回成功
        resolve();
    }

}