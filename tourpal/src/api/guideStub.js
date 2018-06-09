import * as mockData from "./mock/guide_mock_data";
import * as constant from "./../api/const/guideConst";
import { createMockOrder } from "./mock/order_mock_data";

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
        const isNewGuide = false;
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

    /**
     * 新向导注册的方法
     * @param {*} guide
     * @param {*} resolve
     * @param {*} reject
     */
    signUp(guide, resolve, reject) {
        this.dLog('sign up方法 guide: ', guide)
        setTimeout(
            () => {
                resolve()
            }, 500
        )
    },

    /**
     * 导游取得邀请列表的方法
     * @param {*} guideId
     * @param {*} state
     * @param {*} lastIndex
     * @param {*} resolve
     * @param {*} reject
     */
    queryOrders(guideId, state, lastIndex, resolve, reject) {
        this.dLog(`query orders by state 方法
         guideId: ${guideId} state: ${state} lastIndex: ${lastIndex}`)

        const totalSize = 2 * constant.ORDER_MAX_NUM;
        const getAll = lastIndex == constant.GET_ALL_TAG;
        const hasMoreOrder = !getAll && lastIndex < totalSize;
        var orderList = [];

        if (getAll || hasMoreOrder) {
            var size = getAll ?
                totalSize :
                (totalSize - lastIndex > constant.ORDER_MAX_NUM ?
                    constant.ORDER_MAX_NUM :
                    totalSize - lastIndex);

            for (let i = 0; i < size; i++) {
                let mockOrder = createMockOrder(i + lastIndex, state)
                orderList.push(mockOrder);
            }
        }

        setTimeout(
            () => {
                resolve(orderList);
            },
            300
        );

    }

}
