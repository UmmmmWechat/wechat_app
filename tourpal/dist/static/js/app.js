global.webpackJsonp([11],{

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_httpRequestApi__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_const_commonConst__ = __webpack_require__(9);



/* harmony default export */ __webpack_exports__["a"] = ({
  created: function created() {
    console.log('created');
    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // console.log('app created and cache logs by setStorageSync')
    // wx.chooseLocation({
    //   success: (res) => {
    //     console.log(res);
    //   }
    // })
  },

  // @Add 这是整个程序的开始钩子
  onLaunch: function onLaunch() {
    console.log('launch');
    if (!__WEBPACK_IMPORTED_MODULE_0__api_httpRequestApi__["a" /* isTestMode */]) {
      try {
        // @Add 我在这里把所有的存储给删了，我们并不存在需要记住上次状态的情况，反而如果有上次情况会影响本次运行
        wx.clearStorageSync();
        // 在这里获取了屏幕可用高度
        var sysInfo = wx.getSystemInfoSync();
        var windowHeight = sysInfo.windowHeight;
        wx.setStorageSync(__WEBPACK_IMPORTED_MODULE_1__api_const_commonConst__["a" /* WINDOW_HEIGHT */], windowHeight);
        console.log(windowHeight);
      } catch (error) {
        console.log(error);
      }
    }
  }
});

/***/ }),

/***/ 185:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 66:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 67:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(116);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(185)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-62e06328", Component.options)
  } else {
    hotAPI.reload("data-v-62e06328", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_animate_css__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_animate_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_animate_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_style_index_css__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_style_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__assets_style_index_css__);



// import iView from 'iview';
// import 'iview/dist/styles/iview.css';


__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */].mpType = 'app';

var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
    // 这个字段走 app.json
    config: {
        // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
        pages: ['^pages/role_select/main',

        /** 游客 */
        'pages/tourist_main/main', 'pages/tourist_invite_guide/main', 'pages/tourist_rate_order/main', 'pages/tourist_orders/main', 'pages/tourist_travel_records/main', 'pages/show_spot_guide/main', 'pages/tourist_center/main',

        /** 向导 */
        'pages/guide_sign_up/main', 'pages/guide_main/main', 'pages/guide_check_order/main', 'pages/guide_calendar/main', 'pages/guide_center/main', 'pages/guide_center_info/main', 'pages/guide_center_experience/main', 'pages/select_spots/main',

        /** 展示工具页面 */
        'pages/show_spot_page/main', 'pages/show_guide_page/main', 'pages/test/main', 'pages/z_test/main'],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#42b970',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'white'
            // enablePullDownRefresh: true
        },
        'tabBar': {
            backgroundColor: '#ffffff',
            color: '#aaaaaa',
            selectedColor: '#42b970',
            borderStyle: 'white',
            'list': [{
                'pagePath': 'pages/guide_main/main',
                'text': '邀请',
                'iconPath': './static/image/invitation.png',
                'selectedIconPath': './static/image/invitation_selected.png'
            }, {
                'pagePath': 'pages/guide_calendar/main',
                'text': '日程',
                'iconPath': './static/image/calendar.png',
                'selectedIconPath': './static/image/calendar_selected.png'
            }, {
                'pagePath': 'pages/guide_center/main',
                'text': '个人中心',
                'iconPath': './static/image/user_center.png',
                'selectedIconPath': './static/image/user_center_selected.png'
            }]
        }
    }
});

/***/ })

},[94]);
//# sourceMappingURL=app.js.map