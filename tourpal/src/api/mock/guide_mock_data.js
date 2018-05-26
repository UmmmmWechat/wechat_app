mockOrders: [
    createMockOrder(),
    createMockOrder(),
    createMockOrder()
]
mockGuide: [
    createMockGuide(1),
]
var createMockGuide = function(i) {
    return {
        id: i,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526121882561&di=c15bfa3211e5ac3187be885db53016d4&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2Fa054478cfce531e62c1bb5a122ed71f6193533d7.jpg',
        name: '文向东' + i,
        age: 18 + i,
        gender: '男',
        goodFeedbackRate: 80 + i,
        wechat: 'ericlpl',
        phone: '112232323'
    }
}

var createMockOrder = function() {
    return {
        id: 1,
        touristId: 1,
        guideId: 1,
        spotId: 1,
        generatedDate: new Date(),
        travelDate: new Date(),
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

export {
    mockOrders,
    mockGuide
}