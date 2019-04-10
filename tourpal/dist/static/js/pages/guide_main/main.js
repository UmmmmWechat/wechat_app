global.webpackJsonp([9],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(74);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
    config: {
        navigationBarTitleText: '邀请查看',
        navigationBarTextStyle: 'white',
        navigationBarBackgroundColor: '#42b970'
    }
});

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_order_OrderList__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_guide__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_const_guideConst__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_const_orderConst__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_mock_guide_mock_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_url__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//











/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    OrderListGuide: __WEBPACK_IMPORTED_MODULE_0__components_order_OrderList__["a" /* default */]
  },
  data: function data() {
    return {
      guide: {},
      guideType: __WEBPACK_IMPORTED_MODULE_3__api_const_orderConst__["b" /* GUIDE_TYPE */],
      orders: [],
      hasMore: true,
      loading: false,
      pageName: 'guide_main'
    };
  },
  onShow: function onShow() {
    this.hasMore = true;
    this.loading = true;

    // 取得 向导ID
    this.guide.id = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_2__api_const_guideConst__["e" /* GUIDE_ID */]);
    if (!this.guide.id) {
      var errMsg = "向导ID获取失败";

      var url = '/' + __WEBPACK_IMPORTED_MODULE_5__pages_url__["c" /* ROLE_SELECT */];
      this.dLog('跳转', url);
      wx.redirectTo({ url: url });

      this.showErrorRoast(errMsg);
      return;
    }

    // 取得向导信息
    this.getUserInfo();
  },

  methods: {
    dLog: function dLog(message) {
      for (var _len = arguments.length, optionalParams = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        optionalParams[_key - 1] = arguments[_key];
      }

      console.log(this.pageName, message, optionalParams);
    },
    dError: function dError(message) {
      for (var _len2 = arguments.length, optionalParams = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        optionalParams[_key2 - 1] = arguments[_key2];
      }

      console.error(this.pageName, message, optionalParams);
    },
    showErrorRoast: function showErrorRoast(errMsg) {
      for (var _len3 = arguments.length, fai = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        fai[_key3 - 1] = arguments[_key3];
      }

      this.dError(errMsg, fai);

      // 输出提示信息
      wx.showToast({
        icon: 'none',
        title: errMsg
      });
    },
    getUserInfo: function getUserInfo() {
      var _this = this;

      this.dLog('getUserInfo 方法响应');

      __WEBPACK_IMPORTED_MODULE_1__api_guide__["a" /* default */].queryUserInfo(this.guide.id, function (res) {
        _this.dLog("取得向导信息成功", res);
        _this.guide = res;
        // 存储向导信息
        wx.setStorage({
          key: __WEBPACK_IMPORTED_MODULE_2__api_const_guideConst__["j" /* GUIDE_INFO */],
          data: _this.guide,
          success: function success(suc) {
            // 存储向导信息成功
            _this.dLog("存储向导信息成功", suc);
            _this.loading = false;
            _this.getOrders();
          }
        });
      }, function (rej) {
        var errMsg = "粗错啦QWQ没有找到你的向导信息\n请重新注册";
        _this.loading = false;

        var url = '/' + __WEBPACK_IMPORTED_MODULE_5__pages_url__["l" /* GUIDE_SIGN_UP */];
        _this.dLog('跳转', url);
        wx.redirectTo({ url: url });

        _this.showErrorRoast(errMsg, rej);
        return;
      });
    },
    getOrders: function getOrders() {
      var _this2 = this;

      this.dLog('getOrders 方法响应');

      if (this.loading) {
        this.dLog("加载中 return");
        return;
      }
      if (!this.hasMore) {
        this.dLog("已经加载全部 return");
        return;
      }

      // 改为正在loading
      this.loading = false;

      this.orders.splice(0, this.orders.length); // 清空原 orders 数组

      // 取得等待中的邀请
      __WEBPACK_IMPORTED_MODULE_1__api_guide__["a" /* default */].queryOrders(this.guide.id, __WEBPACK_IMPORTED_MODULE_2__api_const_guideConst__["b" /* STATES_ARRAY */][__WEBPACK_IMPORTED_MODULE_2__api_const_guideConst__["c" /* WAITING_STATE */]], -1, function (res) {
        _this2.dLog('取得等待中的邀请完成', res);

        _this2.hasMore = res.hasMore;

        for (var key in res.orderList) {
          _this2.orders.push(res.orderList[key]);
        }

        _this2.loading = false;
      }, function (err) {
        var errMsg = '粗错啦QWQ没找到你的邀请';
        _this2.showErrorRoast(errMsg, err);

        _this2.loading = false;
      });
    },
    handleGuideNameClicked: function handleGuideNameClicked(event) {
      this.dLog('跳转到向导的个人中心');
      var url = '/' + __WEBPACK_IMPORTED_MODULE_5__pages_url__["o" /* GUIDE_CENTER */];
      this.dLog('跳转', url);
      wx.switchTab({ url: url });
    },
    handleOrderChanged: function handleOrderChanged(orderId) {
      this.dLog('一个邀请需要被删除，orderId为', orderId);
      // 去掉这一个
      this.orders.splice(this.orders.findIndex(function (item) {
        return item.id === orderId;
      }), 1);
    }
  }

});

/***/ }),

/***/ 190:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 191:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 192:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 193:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "d-head",
    attrs: {
      "id": "head"
    }
  }, [_c('div', [_c('span', [_vm._v("欢迎 ")]), _vm._v(" "), _c('span', {
    staticClass: "underline_span",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.handleGuideNameClicked
    }
  }, [_vm._v("\n        " + _vm._s(_vm.guide.realName) + "\n      ")])])]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "body"
    }
  }, [_c('order-list-guide', {
    attrs: {
      "type": _vm.guideType,
      "loading": _vm.loading,
      "hasMore": _vm.hasMore,
      "orders": _vm.orders,
      "eventid": '1',
      "mpcomid": '0'
    },
    on: {
      "on-accept": _vm.handleOrderChanged,
      "on-cancel": _vm.handleOrderChanged,
      "on-reject": _vm.handleOrderChanged
    }
  })], 1)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-68e9d96f", esExports)
  }
}

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_68e9d96f_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(262);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(190)
  __webpack_require__(192)
  __webpack_require__(193)
  __webpack_require__(191)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-68e9d96f"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_68e9d96f_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\guide_main\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68e9d96f", Component.options)
  } else {
    hotAPI.reload("data-v-68e9d96f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ })

},[100]);
//# sourceMappingURL=main.js.map