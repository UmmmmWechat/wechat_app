var spotJson = `{
    "name": "\u592b\u5b50\u5e99",
    "pictureUrl": "https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/lvpics/pic/item/50da81cb39dbb6fdb42a24970824ab18972b370a.jpg",
    "introduction": "\u592b\u5b50\u5e99\u662f\u53e4\u5efa\u7b51\u4e0e\u73b0\u4ee3\u5316\u7684\u7ed3\u5408\uff0c\u9760\u8fd1\u79e6\u6dee\u6cb3\u4e00\u5e26\u7684\u5efa\u7b51\u6bd4\u8f83\u53e4\u6734\u3002\u665a\u4e0a\u591c\u8272\u7b3c\u7f69\u4f1a\u66f4\u6f02\u4eae\uff0c\u5750\u8239\u591c\u6e38\u79e6\u6dee\u6cb3\u666f\u8272\u5f88\u597d\u3002\u5468\u8fb9\u7684\u5c0f\u5403\u5f88\u591a\uff0c\u4e0d\u8fc7\u90fd\u4e0d\u592a\u6b63\u5b97\uff0c\u4f46\u9f99\u987b\u7cd6\u548c\u5510\u8bb0\u81ed\u8c46\u8150\u8fd8\u662f\u633a\u4e0d\u9519\u3002"
}`;
var mockSpot = JSON.parse(spotJson);

var mockGuide = function(i) {
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
};

var mockSpotList = [

];

var mockTourist = {

};

var mockTouristID = "testTouristID";

export {
    mockTouristID,
    mockSpot
}