# TourPal API

### tourist取消订单

* /orders/cancel
* POST
* 参数
  * orderId
  * cancelMessage
* 返回
  * SUCCESS
  * ERROR, ALREADY_ACCEPTED, ALREADY_REJECTED (已经被导游处理了)

### tourist评论订单

- /orders/commend
- POST
- 参数
  - orderId
  - feedback (数据结构见之前的会议)
- 返回
  - SUCCESS
  - ERROR

### tourist根据关键词获取 guides

- /guides/by-keyword
- GET
- 参数
  - keyword
  - lastIndex
- 返回
  - [ {guide1}...  ]

### tourist根据景点ID获取 guides

- /guides/by-spot-id
- GET
- 参数
  - spotId
  - lastIndex
- 返回
  - [ {guide1}...  ]

### tourist根据关键词获取 orders

- /orders/for-tourist/by-keyword
- GET
- 参数
  - touristId
  - keyword
  - lastIndex
- 返回
  - [ {order1}...  ]

### tourist根据状态获取 orders

- /orders/for-tourist/by-state
- GET
- 参数
  - touristId
  - state
  - lastIndex
- 返回
  - [ {order1}...  ]

### tourist发起新邀请

- /orders/new
- POST
- 参数
  - order (数据结构见会议)
  - formId (表单submit之后会有的，参见我的邀请界面的逻辑代码)
- 返回
  - SUCCESS

### tourist登陆

- /login/tourist
- POST
- 参数
  - code (微信小程序临时凭证)
- 返回
  - touristId (游客在系统中的标识)

## *Guide* Service

### guide接受邀请

- /orders/accept
- POST
- 参数
  - orderId
- 返回
  - SUCCESS
  - NOT_FOUND, ALREADY_CANCELED(已经被游客取消了)

### guide拒绝邀请

- /orders/reject
- POST
- 参数
  - orderId
- 返回
  - SUCCESS
  - NOT_FOUND, ALREADY_CANCELED(已经被游客取消了)

### guide获取导游信息

- /guides/info
- GET
- 参数
  - guideId
- 返回
  - guide (数据结构见会议)

### guide修改导游信息

- /guides/modify
- POST
- 参数
  - guide (数据结构见会议)
- 返回
  - SUCCESS

### guide根据关键词获取 orders

- /orders/for-guide/by-keyword
- GET
- 参数
  - guideId
  - keyword
  - lastIndex
- 返回
  - [ {order1}...  ]

### guide根据状态获取 orders

- /orders/for-guide/by-state
- GET
- 参数
  - guideId
  - state
  - lastIndex
- 返回
  - [ {order1}...  ]

### guide登陆

- /login/guide
- POST
- 参数
  - code (微信小程序临时凭证)
- 返回
  - {

    ​	message: 'NOT_REGISTER',

    ​	guideId: guideId 

    }  // 未实名注册

  - {

    ​	message: 'SUCCESS',

    ​	guideId: guideId 

    }

### guide注册

- /sign-up/guide
- POST
- 参数
  - guide （数据结构见会议）
  - code 
- 返回
  - 'SUCCESS' 200  onSuccess
  - 非200 onFail

## **

### 根据ID获取 spot

- /spots/by-id
- GET
- 参数
  - spotId
- 返回
  - spot (数据结构见会议)

### 根据关键词和城市获取 spots

- /spots/by-keyword-and-city
- GET
- 参数
  - keyword
  - city
  - lastIndex
- 返回
  - [ {spot1}...  ]

### 根据地区获取 spots

- /spots/by-location
- GET
- 参数
  - location {province, city, region}
  - lastIndex
- 返回
  - [ {spot1}...  ]

### 根据ID获取 guide 的完整信息

- /guides/by-id
- GET
- 参数
  - guideId
- 返回
  - guide(数据结构见会议)

### 根据id获取guide的基本信息

- /guides/by-id/basic
- GET
- 参数
  - guideId
- 返回
  - guide 去掉了敏感信息，包括联系方式

### 根据ID获取 order

- /orders/by-id
- GET
- 参数
  - orderId
- 返回
  - order(数据结构见会议)