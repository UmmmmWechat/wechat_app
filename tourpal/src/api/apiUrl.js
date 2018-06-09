// TourPal API

/* tourist API */
const TOURIST_LOGIN = "/login/tourist";
const TOURIST_NEW_ORDER = "/orders/new";
const TOURIST_CANCEL_ORDER = "/orders/cancel";
const TOURIST_COMMENT_ORDER = "/orders/commend";
const GET_GUIDE_BY_KEYWORD = "/guides/by-keyword";
const GET_GUIDE_BY_SPOT_ID = "/guides/by-spot-id";
const TOURIST_GET_ORDER_BY_STATE = "/orders/for-tourist/by-state";
const TOURIST_GET_ORDER_BY_KEYWORD = "/orders/for-tourist/by-keyword";

/* guide API */
const GUIDE_LOGIN = "/login/guide";
const GUIDE_SIGN_UP = "/sign-up/guide";
const GET_GUIDE_INFO = "/guides/info";
const MODIFY_GUIDE_INFO = "/guides/modify";
const GUIDE_ACCEPT_ORDER = "/orders/accept";
const GUIDE_REJECT_ORDER = "/orders/reject";
const GUIDE_GET_ORDER_BY_STATE = "/orders/for-guide/by-state";
const GUIDE_GET_ORDER_BY_KEYWORD = "/orders/for-guide/by-keyword";

/* other API */
const GET_SPOTS_BY_ID = "/spots/by-id";
const GET_SPOTS_BY_KEYWORD_AND_CITY = "/spots/by-keyword-and-city";
const GET_SPOTS_BY_LOCATION = "/spots/by-location";
const GET_GUIDES_BY_ID = "/guides/by-id";
const GET_GUIDES_BY_ID_BASIC = "/guides/by-id/basic";
const GET_ORDERS_BY_ID = "/orders/by-id";

export {
    TOURIST_LOGIN,
    TOURIST_NEW_ORDER,
    TOURIST_CANCEL_ORDER,
    TOURIST_COMMENT_ORDER,
    GET_GUIDE_BY_KEYWORD,
    GET_GUIDE_BY_SPOT_ID,
    TOURIST_GET_ORDER_BY_STATE,
    TOURIST_GET_ORDER_BY_KEYWORD,
    GUIDE_LOGIN,
    GUIDE_SIGN_UP,
    GET_GUIDE_INFO,
    MODIFY_GUIDE_INFO,
    GUIDE_ACCEPT_ORDER,
    GUIDE_REJECT_ORDER,
    GUIDE_GET_ORDER_BY_STATE,
    GUIDE_GET_ORDER_BY_KEYWORD,
    GET_SPOTS_BY_ID,
    GET_SPOTS_BY_KEYWORD_AND_CITY,
    GET_SPOTS_BY_LOCATION,
    GET_GUIDES_BY_ID,
    GET_GUIDES_BY_ID_BASIC,
    GET_ORDERS_BY_ID
}