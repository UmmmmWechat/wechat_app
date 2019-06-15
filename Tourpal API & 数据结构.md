# Tourpal 数据结构 & API

## 数据结构

### guide

```javascript
    {
        id: int,
        openId: String,
        avatar: String,
        realName: String,
        idCard: String,
        gender: ['男'，'女'],
        wechat: String,
        phone: String,
        goodFeedbackRate: int
        introduction: String,
        numOfFinishedOrder: int,
        favorSpots: List<int>
          
        //新增
        age: int,  // 无需设置，由身份证计算得到
    }
```

### tourist （懒得加数据结构，注册也直接用这个）

```javascript
    {
        id: int
        openId: String, // 微信服务器给的唯一用户标识
          
        // 新增
        name: String,
        wechat: String,
        idCard: String，
        age: int,  // 无需设置，由身份证计算得到
    }
```

### order

```javascript
    {
        id: int
        touristId: int
        guideId: int
        spotId: int
        generatedDate: Date
        travelDate: Date
        message: String // 邀请留言
        state: ['finished', 'waiting', 'ongoing', 'invalid', 'rejected', 'canceled', 'timeout']
        cancelReason: String
        feedback: {
            spotPoint: int
            guidePoint: int
            comment: String // 对这一单的评价
        }
    }
    
```

### spot

```javascript
    {
        id: int
        name: String
        location: {
                province: String
                city: String
                region: String
        },
        pictureUrl: String
        introduction: Stirng
        recommendLevel: int
        popularity: int
    }
```

### State

```javascript
   enum State{
       OK,
       FAIL,
       WAITING,
       ONGOING,
       REJECTED,
       CANCELED,
       FINISHED,
       TIMEOUT,
       ALL
   }
```

### ResultMessage
```javascript
{
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',           // 实际未使用，直接 throw err
    ERROR_DATABASE: 'ERROR_DATABASE',
    INVALID_PARAM: 'INVALID_PARAM',
    NOT_FOUND: 'NOT_FOUND', 
    ALREADY_CANCELED: 'ALREADY_CANCELED', // 已经被游客取消了
    ALREADY_TIMEOUT: 'ALREADY_TIMEOUT',   // 已经过期了
    ALREADY_ACCEPTED: 'ALREADY_ACCEPTED',
    ALREADY_REJECTED: 'ALREADY_REJECTED',
    ERROR_ACCESS_TOKEN: 'ERROR_ACCESS_TOKEN',
    TIMEOUT_FORM_ID: 'ERROR_FORM_ID', // formId过期
    NOT_REGISTER: 'NOT_REGISTER',
    INVALID_CODE: 'INVALID_CODE'
}
```


### Location

```javascript
   class Location {
       String province;
   
       String city;
   
       String region;
   }
```

### GuidePre

```java
   class GuidePre {
       String openId;
       
       String realName; //真实名
       
       String idCard; //身份证
       
       char gender; //性别
       
       Location location; //地址
       
       String wechat; //微信号
       
       String phone; //电话号码
       
       List<Integer> favorSpots; //景点
   }
```

### GuideModify

```java
   class GuideModify {
       int id;
       
       Location location; //地址
       
       String wechat; //微信号
       
       String phone; //电话号码
       
       List<Integer> favorSpots; //景点 
   }
```

### OrderPre

```java
   class OrderPre {
       int touristId;

       List<Integer> guideIds;
       
       int spotId;
       
       Date generatedDate;
       
       Date travelDate;
       
       String message;
   }
```



## API

## Tourist Service

### tourist取消订单

* /orders/cancel
* POST
* 参数
  * orderId
  * cancelMessage
* 返回
  * SUCCESS
  * ALREADY_ACCEPTED, ALREADY_REJECTED (已经被导游处理了)

### tourist评论订单

- /orders/commend
- POST
- 参数
  - orderId
  - feedback
- 返回
  - SUCCESS

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
  - order: OrderPre (数据结构见上面)
  - formId (表单submit之后会有的，参见我的邀请界面的逻辑代码)
- 返回
  - SUCCESS

### tourist登陆

- /login/tourist
- POST
- 参数
  
  - code (微信小程序临时凭证)
- 返回
  
  - {
  
    message: 'NOT_REGISTER',
  
     touristId: touristId
  
    }  // 未实名注册
  
  - {
  
    message: 'SUCCESS',
  
     	touristId: touristId
  
    }

### tourist注册

- /sign-up/tourist
- POST
- 参数
  - tourist
- 返回
  - SUCCESS

## Guide Service

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
  - guide (数据结构见上面)

### guide修改导游信息

- /guides/modify
- POST
- 参数
  - guide: GuideModify (数据结构见上面)
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

    	message: 'NOT_REGISTER',

      	guideId: guideId 

    }  // 未实名注册

  - {

    	message: 'SUCCESS',

      	guideId: guideId 

    }

### guide注册

- /sign-up/guide
- POST
- 参数
  - guide: GuidePre （数据结构见上面）
  - code 
- 返回
  - SUCCESS

## Common Service

### 根据ID获取 spot

- /spots/by-id
- GET
- 参数
  - spotId
- 返回
  - spot (数据结构见上面)

### 根据关键词和城市获取 spots

- /spots/by-keyword-and-city
- GET
- 参数
  - keyword
  - city
  - lastIndex
- 返回
  - [ {spot1}...  ]

### 根据关键词获取 spots

- /spots/by-keyword
- GET
- 参数
  - keyword
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
  - guide(数据结构见上面)

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
  - order(数据结构见上面)