global.webpackJsonp([13],{

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(87);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
  config: {
    navigationBarTitleText: '我的游记'
  }
});

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_tourist__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_common__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_common_DLoading__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_common_DNoMore__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_common_DTimeline__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_const_touristConst__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_const_commonConst__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_OrderState__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_OrderState___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__utils_OrderState__);
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
    DLoading: __WEBPACK_IMPORTED_MODULE_2__components_common_DLoading__["a" /* default */],
    DNoMore: __WEBPACK_IMPORTED_MODULE_3__components_common_DNoMore__["a" /* default */],
    DTimeline: __WEBPACK_IMPORTED_MODULE_4__components_common_DTimeline__["a" /* default */]
  },
  data: function data() {
    return {
      events: [],
      touristId: '',
      loading: false,
      hasMore: true,
      finishedLoading: false,
      pageName: "tourist_travel_record",
      scrollHeight: 500
    };
  },

  computed: {
    scrollViewStyle: function scrollViewStyle() {
      return 'height: ' + this.scrollHeight + 'px';
    }
  },
  mounted: function mounted() {
    this.finishedLoading = false;

    this.scrollHeight = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_6__api_const_commonConst__["a" /* WINDOW_HEIGHT */]);
    console.log('height', this.scrollHeight);
    // 获取touristId参数
    // this.touristId = wx.getStorageSync(TOURIST_ID)
    this.touristId = 1;
    if (!this.touristId) {
      // 跳回
      wx.navigateBack();

      // 未找到游客ID
      this.showErrorRoast('粗错啦QWQ 没有找到你的ID');

      return;
    }

    // 初始化数据
    this.hasMore = true;

    this.finishedLoading = true;

    // 获取 events
    this.getEvents();
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
    getEvents: function getEvents() {
      var _this = this;

      this.dLog("getEvents 方法响应");

      if (this.loading) {
        return;
      }

      this.hasMore = true;
      this.loading = true;

      var lastIndex = this.events.length;

      __WEBPACK_IMPORTED_MODULE_0__api_tourist__["a" /* default */].queryOrders(this.touristId, __WEBPACK_IMPORTED_MODULE_7__utils_OrderState___default.a.FINISHED, lastIndex, function (res) {
        _this.dLog("取得完成邀请成功");

        _this.hasMore = res.hasMoreOrder;

        _this.transOrdersToEvents(res.orderList);

        _this.loading = false;
      }, function (err) {
        _this.showErrorRoast("粗错啦QWQ暂时找不到");
        _this.loading = false;
      });
    },
    transOrdersToEvents: function transOrdersToEvents(orderList) {
      this.dLog("transOrdersToEvents", orderList);

      orderList.forEach(this.translateToEvent);
    },
    translateToEvent: function translateToEvent(order) {
      var _this2 = this;

      var feedback = order.feedback;

      var event = {
        date: new Date(order.travelDate).toLocaleDateString(),
        content: ''
      };
      this.events.push(event);
      if (!feedback) return;

      // 景点的评价
      var spotCommend = '';
      switch (feedback.spotPoint) {
        case 0:
          spotCommend = '感觉景点很不好';
          break;
        case 1:
        case 2:
          spotCommend = '景点一般';
          break;
        case 3:
        case 4:
          spotCommend = '景点不错';
          break;
        case 5:
          spotCommend = '景点太棒了';
          break;
      }

      // 导游的评价
      var guideCommend = '';
      switch (feedback.guidePoint) {
        case 0:
          guideCommend = '向导太差劲了';
          break;
        case 1:
        case 2:
          guideCommend = '向导一般';
          break;
        case 3:
        case 4:
          guideCommend = '向导人还不赖嘛';
          break;
        case 5:
          guideCommend = '向导人超好的';
          break;
      }

      var onFail = function onFail(fai) {
        _this2.showErrorRoast("邀请记录粗错啦QWQ");
        _this2.loading = false;
      };

      // 查询向导姓名
      __WEBPACK_IMPORTED_MODULE_1__api_common__["a" /* default */].queryBasicGuideById(order.guideId, function (res) {
        _this2.dLog("取得基本导游信息成功", res);
        var guide = res;
        event.content += '\u548C' + guide.realName + '\u4E00\u8D77\u6E38\u73A9\u4E86';
        // 查询景点名称
        __WEBPACK_IMPORTED_MODULE_1__api_common__["a" /* default */].querySpotById(order.spotId, function (res) {
          _this2.dLog("取得景点信息成功", res);
          var spot = res;
          event.content += '\u666F\u70B9' + spot.name + '\uFF0C' + spotCommend + '\uFF0C' + guideCommend + '\u3002';
        }, onFail);
      }, onFail);
    },
    handleScrollToLower: function handleScrollToLower(event) {
      this.getEvents();
    }
  }
});

/***/ }),

/***/ 219:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('scroll-view', {
    staticClass: "scroll",
    style: (_vm.scrollViewStyle),
    attrs: {
      "scroll-y": "",
      "enable-back-to-top": "",
      "eventid": '0'
    },
    on: {
      "scrolltolower": _vm.handleScrollToLower
    }
  }, [_c('div', {
    attrs: {
      "id": "timeline-wrapper"
    }
  }, [_c('d-timeline', {
    attrs: {
      "events": _vm.events,
      "mpcomid": '0'
    }
  })], 1), _vm._v(" "), (_vm.finishedLoading) ? _c('div', [_c('d-loading', {
    attrs: {
      "loading": _vm.loading,
      "mpcomid": '1'
    }
  }), _vm._v(" "), _c('d-no-more', {
    attrs: {
      "has-more": _vm.hasMore,
      "mpcomid": '2'
    }
  }), _vm._v(" "), _c('d-no-more', {
    attrs: {
      "has-more": !_vm.hasMore || _vm.events.length || _vm.loading,
      "mpcomid": '3'
    }
  })], 1) : _vm._e()])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-bb83fcc6", esExports)
  }
}

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_bb83fcc6_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(277);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(219)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-bb83fcc6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_bb83fcc6_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\tourist_travel_records\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bb83fcc6", Component.options)
  } else {
    hotAPI.reload("data-v-bb83fcc6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ })

},[113]);
//# sourceMappingURL=main.js.map