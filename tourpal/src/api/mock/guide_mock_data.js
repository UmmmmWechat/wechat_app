import { mockUserAvatorUrl } from "../../assets/image/imgMock";

var createMockGuide = function(i) {
    return {
        id: "testGuideID" + i,
        avatar: mockUserAvatorUrl,
        realName: '体验导游' + i,
        idCard: "000000199001010001",
        age: 18 + i,
        gender: '男',
        wechat: 'wechat',
        phone: '11111111111',
        goodFeedbackRate: 80 + i,
        introduction: '简短的介绍',
        numOfFinishedOrder: 10 + i,
        favorSpots: ['夫子庙', '秦淮河', '玄武湖']
    }
}

var mockGuide = createMockGuide(-1);
var mockGuideList = [
    mockGuide,
    createMockGuide(0),
    createMockGuide(1),
    createMockGuide(2),
    createMockGuide(3),
    createMockGuide(4),
    createMockGuide(5),
    createMockGuide(6),
    createMockGuide(7),
    createMockGuide(8),
]

export {
    mockGuideList,
    mockGuide,
    createMockGuide
}