var createMockGuide = function(i) {
    return {
        id: "testGuideID" + i,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526121882561&di=c15bfa3211e5ac3187be885db53016d4&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2Fa054478cfce531e62c1bb5a122ed71f6193533d7.jpg',
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

var createMockOrder = function() {
    return {
        id: 1,
        touristId: 1,
        guideId: 1,
        spotId: 1,
        generatedDate: createDate(),
        travelDate: createDate(),
        message: '老司机带我飞',
        state: 'waiting',
        cancelReason: null,
        feedback: {
            spotPoint: null,
            guidePoint: null,
            comment: null
        }
    }
}

var createDate = function() {
    return new Date().toLocaleDateString()
}

var mockOrders = [
    createMockOrder(),
    createMockOrder(),
    createMockOrder(),
    createMockOrder(),
    createMockOrder()
]
var mockGuide = {
    id: "testGuideID",
    avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526121882561&di=c15bfa3211e5ac3187be885db53016d4&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2Fa054478cfce531e62c1bb5a122ed71f6193533d7.jpg',
    realName: '体验导游',
    idCard: "000000199001010001",
    age: 18,
    gender: '男',
    wechat: 'wechat',
    phone: '11111111111',
    goodFeedbackRate: 80,
    introduction: '简短的介绍',
    numOfFinishedOrder: 10,
    favorSpots: ['夫子庙', '秦淮河', '玄武湖']
}
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
    mockOrders,
    mockGuideList,
    mockGuide
}