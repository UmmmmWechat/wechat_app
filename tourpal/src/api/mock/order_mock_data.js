var createMockOrder = function(i, state) {
    return {
        id: `testOrderID${i}`,
        touristId: `testTouristID${i}`,
        guideId: `guideID${i}`,
        spotId: `spotID${i}`,
        generatedDate: createDate(),
        travelDate: createDate(),
        message: '老司机带我飞',
        state: state,
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

var MOCK_ORDERS = [
    createMockOrder(0, "STATE"),
    createMockOrder(1, "STATE"),
    createMockOrder(2, "STATE"),
    createMockOrder(3, "STATE"),
    createMockOrder(4, "STATE"),
    createMockOrder(5, "STATE")
]

export {
    MOCK_ORDERS,
    createMockOrder
}