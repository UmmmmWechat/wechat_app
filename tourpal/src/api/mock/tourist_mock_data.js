var createMockGuide = function(i) {
    return {
        id: i + "",
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526121882561&di=c15bfa3211e5ac3187be885db53016d4&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2Fa054478cfce531e62c1bb5a122ed71f6193533d7.jpg',
        name: '文向东' + i,
        age: 18 + i,
        gender: '男',
        goodFeedbackRate: 80 + i,
        wechat: 'ericlpl',
        phone: '112232323'
    }
};
var mockGuide = createMockGuide(0);

var mockSpotList = [

];

var mockTourist = {

};

var MOCK_TOURIST_ID = "testTouristID";

export {
    MOCK_TOURIST_ID,
    createMockGuide,
    mockGuide
}