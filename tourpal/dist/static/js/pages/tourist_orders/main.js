global.webpackJsonp([2],{

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(85);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
  config: {
    navigationBarTitleText: '邀请列表'
  }
});

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
    props: {
        menus: {
            type: Array,
            required: true
        },
        current: {
            type: Number,
            default: 0
        }
    },
    methods: {
        handleClickMenuItem: function handleClickMenuItem(event, index) {
            //   event.target.value = index;
            //   this.$emit('on-change', event);
            this.$emit('on-change', index);
        }
    }
});

/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_tourist__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_common_DNavigatorBar__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_order_OrderList__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_const_touristConst__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_mock_tourist_mock_data__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_const_commonConst__ = __webpack_require__(9);
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
    DNavigatorBar: __WEBPACK_IMPORTED_MODULE_1__components_common_DNavigatorBar__["a" /* default */],
    OrderListTourist: __WEBPACK_IMPORTED_MODULE_2__components_order_OrderList__["a" /* default */]
  },
  data: function data() {
    return {
      scrollHeight: 400,
      touristId: __WEBPACK_IMPORTED_MODULE_4__api_mock_tourist_mock_data__["a" /* MOCK_TOURIST_ID */],
      menus: __WEBPACK_IMPORTED_MODULE_3__api_const_touristConst__["k" /* INVALID_STATE_MENU */],
      current: 0,

      hasMoreArray: [true, true, true],
      ordersArray: [[], [], []],
      loadingArray: [false, false, false],

      pageName: 'invalid_tourist_order_page'
    };
  },

  computed: {
    heightStyle: function heightStyle() {
      return 'height: ' + (this.scrollHeight - 50) + 'px';
    }
  },
  mounted: function mounted() {
    this.touristId = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_3__api_const_touristConst__["a" /* TOURIST_ID */]);
    this.current = 0;

    this.hasMoreArray = [true, true, true];

    this.ordersArray = [[], [], []];

    this.loadingArray = [false, false, false];

    this.scrollHeight = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_5__api_const_commonConst__["a" /* WINDOW_HEIGHT */]);

    this.queryOrders();
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
    queryOrders: function queryOrders() {
      var _this = this;

      for (var _len4 = arguments.length, event = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        event[_key4] = arguments[_key4];
      }

      this.dLog("queryOrders 方法响应", event);
      var index = this.current;

      if (this.loadingArray[index]) {
        this.dLog("加载中 return");
        return;
      }

      // 加载
      // this.loadingArray[index] = true
      this.loadingArray.splice(index, 1, true);

      // 保留下上次最后的index
      var lastIndex = this.ordersArray[index].length;
      this.dLog(this.touristId);

      __WEBPACK_IMPORTED_MODULE_0__api_tourist__["a" /* default */].queryOrders(this.touristId, __WEBPACK_IMPORTED_MODULE_3__api_const_touristConst__["l" /* INVALID_STATE_ARRAY */][index], lastIndex, function (res) {
        _this.dLog("取得邀请列表成功", res);

        // this.hasMoreArray[index] = res.hasMoreOrder;
        // this.loadingArray[index] = false;
        _this.hasMoreArray.splice(index, 1, res.hasMoreOrder);
        _this.loadingArray.splice(index, 1, false);

        for (var key in res.orderList) {
          _this.ordersArray[index].push(res.orderList[key]);
        }
      }, function (rej) {
        _this.showErrorRoast("取得邀请列表失败", rej);
        // this.loadingArray[index] = false;
        _this.loadingArray.splice(index, 1, false);
      });
    },
    handleChangeType: function handleChangeType(event) {
      this.current = event.target.value;
      this.queryOrders();
    }
  }
});

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_tourist__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_order__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_common_DNavigatorBar__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_common_DInput__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_order_OrderList__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_tourist_InvalidTouristOrderPage__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_const_touristConst__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__api_const_commonConst__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__api_mock_tourist_mock_data__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_url__ = __webpack_require__(3);
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
    DNavigatorBar: __WEBPACK_IMPORTED_MODULE_2__components_common_DNavigatorBar__["a" /* default */],
    OrderListTourist: __WEBPACK_IMPORTED_MODULE_4__components_order_OrderList__["a" /* default */],
    DInput: __WEBPACK_IMPORTED_MODULE_3__components_common_DInput__["a" /* default */],
    InvalidTouristOrderPage: __WEBPACK_IMPORTED_MODULE_5__components_tourist_InvalidTouristOrderPage__["a" /* default */]
  },
  data: function data() {
    return {
      touristId: undefined,
      windowHeight: 500,

      loading: false,

      searchHasMore: true,
      isSearch: false,
      searchWord: '',
      searchValue: undefined, // 用于清空搜索框
      searchOrders: [],
      firstSearch: true,

      menus: __WEBPACK_IMPORTED_MODULE_6__api_const_touristConst__["h" /* STATE_MENU */],
      current: __WEBPACK_IMPORTED_MODULE_6__api_const_touristConst__["i" /* WAITING_STATE */],

      hasMoreArray: [true, true, true],
      ordersArray: [[], [], [], []],
      loadingArray: [false, false, false],

      pageName: 'tourist_orders'
    };
  },

  computed: {
    heightStyle: function heightStyle() {
      return 'height: ' + this.windowHeight + 'px';
    }
  },
  mounted: function mounted() {
    this.windowHeight = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_7__api_const_commonConst__["a" /* WINDOW_HEIGHT */]);
    console.log(this.windowHeight);

    this.touristId = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_6__api_const_touristConst__["a" /* TOURIST_ID */]);
    if (!this.touristId) {
      // 未找到游客ID 需要先去登录
      var url = '/' + __WEBPACK_IMPORTED_MODULE_9__pages_url__["c" /* ROLE_SELECT */];
      this.dLog('跳转', url);
      wx.redirectTo({ url: url });

      this.showErrorRoast('未找到游客ID 需要先去登录');

      return;
    }

    this.isSearch = false;
    this.firstSearch = true;
    this.searchHasMore = true;
    this.searchWord = '';
    this.searchOrders.splice(0, this.searchOrders.length); // 清空原 searchOrders 数组

    // this.hasMoreArray = [
    //   true, true, true
    // ]
    //
    // this.ordersArray = [
    //   [], [], []
    // ]
    //
    // this.current = WAITING_STATE
    //
    this.queryOrders();
  },
  onShow: function onShow() {
    this.ordersArray = [[], [], []];

    // this.current = 0
    var index = this.current;
    // this.loadingArray[index] = false
    this.loadingArray.splice(index, 1, false);

    if (this.touristId) {
      this.queryOrders();
    }
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
    queryOrders: function queryOrders() {
      var _this = this;

      for (var _len4 = arguments.length, event = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        event[_key4] = arguments[_key4];
      }

      this.dLog('queryOrders 方法响应', event, this.loadingArray);

      var index = this.current;

      if (this.loadingArray[index]) {
        this.dLog('加载中 return');
        return;
      }

      if (index === __WEBPACK_IMPORTED_MODULE_6__api_const_touristConst__["j" /* INVALID_STATE */]) {
        this.dLog('invalid!');
        return;
      }

      // 加载
      // this.hasMoreArray[index] = true
      // this.loadingArray[index] = true
      this.hasMoreArray.splice(index, 1, true);
      this.loadingArray.splice(index, 1, true);

      // 保留下上次最后的index
      var lastIndex = this.ordersArray[index].length;
      this.dLog(this.touristId);

      __WEBPACK_IMPORTED_MODULE_0__api_tourist__["a" /* default */].queryOrders(this.touristId, __WEBPACK_IMPORTED_MODULE_6__api_const_touristConst__["e" /* STATES_ARRAY */][index], lastIndex, function (res) {
        _this.dLog('取得邀请列表成功', res, index);

        _this.hasMoreArray[index] = res.hasMoreOrder;

        for (var key in res.orderList) {
          _this.ordersArray[index].push(res.orderList[key]);
        }

        // this.loadingArray[index] = false
        _this.loadingArray.splice(index, 1, false);
      }, function (rej) {
        _this.showErrorRoast('取得邀请列表失败', rej, index);

        // this.loadingArray[index] = false
        _this.loadingArray.splice(index, 1, false);
      });
    },
    onNavigatorChange: function onNavigatorChange(index) {
      this.current = index;
      if (this.ordersArray[index] && !this.ordersArray[index].length) {
        this.queryOrders();
      }

      this.dLog('onNavigatorChange \u65B9\u6CD5\u54CD\u5E94 index: ' + index);
    },
    handleSwiperChange: function handleSwiperChange(event) {
      this.current = event.target.current;
      if (this.ordersArray[this.current] && !this.ordersArray[this.current].length) {
        this.queryOrders();
      }
      this.dLog('handleSwiperChange 方法响应', event);
    },
    handleSearchFocus: function handleSearchFocus(event) {
      this.dLog('handleSearchFocus 方法调用', event);
      this.isSearch = true;
    },
    handleSearchInput: function handleSearchInput(e) {
      this.dLog('handleInput 方法调用', e);
      this.searchWord = e;
      this.dLog('message \u66F4\u65B0 ' + this.message);
    },
    handleResetSearch: function handleResetSearch(event) {
      this.dLog('handleResetSearch 方法调用', event);

      // 非空检查
      if (!this.searchWord) {
        this.showErrorRoast('请输入搜索关键词w');
        return;
      }

      this.searchHasMore = true;
      this.firstSearch = false;
      this.searchOrders.splice(0, this.searchOrders.length); // 清空搜索的 spot 数组

      // 重新搜索

      // 按照关键词搜索邀请
      this.searchOrderByKeyword(0);
    },
    handleScrollToSearch: function handleScrollToSearch(event) {
      this.dLog('handleScrollToSearch 方法调用', event);

      if (this.loading) {
        this.dLog('加载中 return');
        return;
      }
      if (!this.searchHasMore) {
        this.dLog('已经加载全部 return');
        return;
      }

      // 按照关键词搜索邀请
      this.searchOrderByKeyword(this.searchOrders.length);
    },
    searchOrderByKeyword: function searchOrderByKeyword(lastIndex) {
      var _this2 = this;

      // 加载
      this.loading = true;

      __WEBPACK_IMPORTED_MODULE_0__api_tourist__["a" /* default */].queryOrdersByKeyword(this.touristId, this.searchWord, lastIndex, function (res) {
        _this2.dLog('搜索邀请列表成功', res);

        _this2.searchHasMore = res.hasMoreOrder;

        for (var key in res.orderList) {
          _this2.searchOrders.push(res.orderList[key]);
        }

        _this2.loading = false;
      }, function (fai) {
        _this2.showErrorRoast('搜索邀请列表失败');

        _this2.loading = false;
      });
    },
    handleClickBack: function handleClickBack(event) {
      this.dLog('handleClickBack 方法调用', event);

      // 清空
      this.handleClearSearch(event);

      this.isSearch = false;
    },
    handleClearSearch: function handleClearSearch(event) {
      var _this3 = this;

      this.dLog('handleClickBack 方法调用', event);

      // 清空搜索框
      this.searchValue = '';
      setTimeout(function () {
        _this3.searchValue = undefined;
      }, 500);

      // 重置属性
      this.searchWord = '';
      this.firstSearch = true;
      this.searchHasMore = true;
      this.searchOrders.splice(0, this.searchOrders.length); // 清空搜索的 spot 数组
    },
    handleCancelOrder: function handleCancelOrder(orderId) {
      this.dLog('取消一个邀请，orderId为', orderId);
      // this
      var index = this.current;
      var orders = this.ordersArray[index];
      // 去掉这一个
      orders.splice(orders.findIndex(function (item) {
        return item.id === orderId;
      }), 1);
    }
  }
});

/***/ }),

/***/ 184:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 203:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 204:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 205:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 206:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 231:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_InvalidTouristOrderPage_vue__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_4a2b2bf1_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_InvalidTouristOrderPage_vue__ = __webpack_require__(259);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(184)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4a2b2bf1"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_InvalidTouristOrderPage_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_4a2b2bf1_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_InvalidTouristOrderPage_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\tourist\\InvalidTouristOrderPage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] InvalidTouristOrderPage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4a2b2bf1", Component.options)
  } else {
    hotAPI.reload("data-v-4a2b2bf1", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "page"
  }, [_c('div', [_c('picker', {
    attrs: {
      "mode": "selector",
      "range": _vm.menus,
      "eventid": '0'
    },
    on: {
      "change": _vm.handleChangeType
    }
  }, [_c('div', {
    attrs: {
      "id": "selector_div"
    }
  }, [_c('span', {
    staticStyle: {
      "border": "rgba(0,0,0,0.3) 1px solid",
      "border-radius": "5px",
      "padding": "2px 5px"
    }
  }, [_c('span', {
    staticClass: "title-span"
  }, [_vm._v("类型：")]), _vm._v("\r\n          " + _vm._s(_vm.menus[_vm.current]) + "\r\n        ")])])])], 1), _vm._v(" "), _c('div', [_c('order-list-tourist', {
    attrs: {
      "orders": _vm.ordersArray[_vm.current],
      "loading": _vm.loadingArray[_vm.current],
      "has-more": _vm.hasMoreArray[_vm.current],
      "eventid": '1',
      "mpcomid": '0'
    },
    on: {
      "scrolltolower": _vm.queryOrders
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
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-4a2b2bf1", esExports)
  }
}

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "d-head",
    attrs: {
      "id": "search-wrapper"
    }
  }, [_c('icon', {
    attrs: {
      "type": "search",
      "size": "10",
      "color": "white"
    }
  }), _vm._v(" "), _c('div', {
    staticStyle: {
      "display": "inline-block",
      "width": "90%"
    }
  }, [_c('d-input', {
    attrs: {
      "placeholder": "搜索邀请",
      "confirm-type": "search",
      "value": _vm.searchValue,
      "eventid": '0',
      "mpcomid": '0'
    },
    on: {
      "input": _vm.handleSearchInput,
      "on-focus": _vm.handleSearchFocus,
      "on-enter": _vm.handleResetSearch
    }
  })], 1)], 1), _vm._v(" "), (_vm.isSearch) ? _c('div', {
    staticClass: "d-search-list"
  }, [_c('div', {
    staticStyle: {
      "text-align": "center",
      "padding": "10rpx"
    }
  }, [_c('button', {
    staticClass: "d-back-btn-white",
    attrs: {
      "size": "mini",
      "plain": "",
      "eventid": '1'
    },
    on: {
      "click": _vm.handleClickBack
    }
  }, [_vm._v("\r\n        返回\r\n      ")]), _vm._v(" "), _c('button', {
    staticClass: "d-back-btn-white",
    staticStyle: {
      "margin-left": "33rpx"
    },
    attrs: {
      "size": "mini",
      "plain": "",
      "eventid": '2'
    },
    on: {
      "click": _vm.handleClearSearch
    }
  }, [_vm._v("\r\n        清空\r\n      ")])], 1), _vm._v(" "), _c('order-list-tourist', {
    attrs: {
      "color": 'white',
      "orders": _vm.searchOrders,
      "loading": _vm.loading,
      "has-more": _vm.searchHasMore,
      "first-search": _vm.firstSearch,
      "eventid": '3',
      "mpcomid": '1'
    },
    on: {
      "scrolltolower": _vm.handleScrollToSearch,
      "on-cancel": _vm.handleResetSearch
    }
  })], 1) : _c('div', [_c('div', {
    attrs: {
      "id": "navigator-bar"
    }
  }, [_c('d-navigator-bar', {
    attrs: {
      "menus": _vm.menus,
      "current": _vm.current,
      "eventid": '4',
      "mpcomid": '2'
    },
    on: {
      "on-change": _vm.onNavigatorChange
    }
  })], 1), _vm._v(" "), _c('div', {
    attrs: {
      "id": "swiper-wrapper"
    }
  }, [_c('swiper', {
    staticClass: "swiper",
    style: (_vm.heightStyle),
    attrs: {
      "current": _vm.current,
      "eventid": '8'
    },
    on: {
      "change": _vm.handleSwiperChange
    }
  }, [_c('swiper-item', {
    staticClass: "swiper-item",
    attrs: {
      "mpcomid": '4'
    }
  }, [_c('order-list-tourist', {
    attrs: {
      "orders": _vm.ordersArray[0],
      "loading": _vm.loadingArray[0],
      "has-more": _vm.hasMoreArray[0],
      "eventid": '5',
      "mpcomid": '3'
    },
    on: {
      "scrolltolower": _vm.queryOrders,
      "on-cancel": _vm.handleCancelOrder
    }
  })], 1), _vm._v(" "), _c('swiper-item', {
    staticClass: "swiper-item",
    attrs: {
      "mpcomid": '6'
    }
  }, [_c('order-list-tourist', {
    attrs: {
      "orders": _vm.ordersArray[1],
      "loading": _vm.loadingArray[1],
      "has-more": _vm.hasMoreArray[1],
      "eventid": '6',
      "mpcomid": '5'
    },
    on: {
      "scrolltolower": _vm.queryOrders
    }
  })], 1), _vm._v(" "), _c('swiper-item', {
    staticClass: "swiper-item",
    attrs: {
      "mpcomid": '8'
    }
  }, [_c('order-list-tourist', {
    attrs: {
      "orders": _vm.ordersArray[2],
      "loading": _vm.loadingArray[2],
      "has-more": _vm.hasMoreArray[2],
      "eventid": '7',
      "mpcomid": '7'
    },
    on: {
      "scrolltolower": _vm.queryOrders
    }
  })], 1), _vm._v(" "), _c('swiper-item', {
    staticClass: "swiper-item",
    attrs: {
      "mpcomid": '10'
    }
  }, [_c('invalid-tourist-order-page', {
    attrs: {
      "mpcomid": '9'
    }
  })], 1)], 1)], 1)])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-7e5a1536", esExports)
  }
}

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "out"
    }
  }, _vm._l((_vm.menus), function(menu, index) {
    return _c('span', {
      key: index,
      staticClass: "menu-item",
      class: {
        'current-menu': _vm.current === index
      },
      attrs: {
        "eventid": '0-' + index
      },
      on: {
        "click": function($event) {
          _vm.handleClickMenuItem($event, index)
        }
      }
    }, [_vm._v("\n      " + _vm._s(menu) + "\n    ")])
  }))
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-ec700680", esExports)
  }
}

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_DNavigatorBar_vue__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_ec700680_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_DNavigatorBar_vue__ = __webpack_require__(284);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(231)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-ec700680"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_DNavigatorBar_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_ec700680_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_DNavigatorBar_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\common\\DNavigatorBar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] DNavigatorBar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ec700680", Component.options)
  } else {
    hotAPI.reload("data-v-ec700680", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_7e5a1536_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(268);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(203)
  __webpack_require__(205)
  __webpack_require__(206)
  __webpack_require__(204)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7e5a1536"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_7e5a1536_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\tourist_orders\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7e5a1536", Component.options)
  } else {
    hotAPI.reload("data-v-7e5a1536", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ })

},[111]);
//# sourceMappingURL=main.js.map