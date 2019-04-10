global.webpackJsonp([21],{

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_common_DTimeline__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_common_DNoMore__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_common_DLoading__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_guide__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_common__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_const_guideConst__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_url__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__api_const_commonConst__ = __webpack_require__(9);
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
  components: { DLoading: __WEBPACK_IMPORTED_MODULE_2__components_common_DLoading__["a" /* default */], DNoMore: __WEBPACK_IMPORTED_MODULE_1__components_common_DNoMore__["a" /* default */], DTimeline: __WEBPACK_IMPORTED_MODULE_0__components_common_DTimeline__["a" /* default */] },
  data: function data() {
    return {
      header: '向导履历',
      events: [],
      guideId: '',
      loading: false,
      hasMore: true,
      scrollHeight: 600,
      finishedLoading: false,
      pageName: 'guide_center_experience'
    };
  },

  computed: {
    scrollViewStyle: function scrollViewStyle() {
      return 'height: ' + this.scrollHeight + 'px';
    }
  },
  mounted: function mounted() {
    this.finishedLoading = false;
    this.guideId = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_5__api_const_guideConst__["e" /* GUIDE_ID */]);
    if (!this.guideId) {
      // 登录失效
      var url = '/' + __WEBPACK_IMPORTED_MODULE_6__pages_url__["c" /* ROLE_SELECT */];
      this.dLog('跳转', url);
      wx.redirectTo({ url: url });

      wx.showToast({
        title: '获取用户信息失败，请重新登录',
        icon: 'none'
      });
      return;
    }

    this.scrollHeight = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_7__api_const_commonConst__["a" /* WINDOW_HEIGHT */]);
    this.dLog(this.scrollHeight + 'px');
    this.loading = false;
    this.finishedLoading = true;

    this.getMoreOrders();
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
    showErrorToast: function showErrorToast(errMsg) {
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
    getMoreOrders: function getMoreOrders() {
      var _this = this;

      this.dLog('getMoreOrders 方法响应');

      if (this.loading) {
        this.dLog('加载中 沉默方法');
        return;
      }

      this.hasMore = true;
      this.loading = true;
      var lastIndex = this.events.length;
      __WEBPACK_IMPORTED_MODULE_3__api_guide__["a" /* default */].queryOrders(this.guideId, __WEBPACK_IMPORTED_MODULE_5__api_const_guideConst__["b" /* STATES_ARRAY */][__WEBPACK_IMPORTED_MODULE_5__api_const_guideConst__["k" /* FINISHED_STATE */]], lastIndex, function (res) {
        _this.dLog('取得邀请列表成功', res);
        var that = _this;

        res.orderList.forEach(function (order) {
          return _this.translateToEvent(order);
        });

        _this.hasMore = res.hasMoreOrder;

        _this.loading = false;
      }, function (err) {
        var errMsg = '粗错啦QWQ时间轴更新布鸟辣';
        _this.loading = false;
        _this.showErrorToast(errMsg, err);
      });
    },
    handleScrollToLower: function handleScrollToLower(event) {
      this.dLog(event);
      this.getMoreOrders();
    },
    translateToEvent: function translateToEvent(order) {
      var _this2 = this;

      var event = {
        date: new Date(order.travelDate).toLocaleDateString(),
        content: ''
      };
      this.events.push(event);
      // 事件内容
      var content = '\u5E26\u9886id\u4E3A' + order.id + '\u7684\u6E38\u5BA2\u4E00\u8D77\u6E38\u73A9\u4E86';
      // 获取景点名
      __WEBPACK_IMPORTED_MODULE_4__api_common__["a" /* default */].querySpotById(order.spotId, function (spot) {
        content += '\u666F\u70B9' + spot.name + '\uFF0C';
        var feedback = order.feedback;
        if (!feedback) {
          event.content = content;
          return;
        }
        var guideComment = '';
        switch (feedback.guidePoint) {
          case 0:
            guideComment = '游客觉得我差劲orz。。。';
            break;
          case 1:
          case 2:
            guideComment = '游客觉得我一般般吧。';
            break;
          case 3:
          case 4:
            guideComment = '游客对我赞赏有佳。';
            break;
          case 5:
            guideComment = '游客觉得我很赞！';
            break;
        }
        content += guideComment;
        event.content = content;
      }, function (err) {
        _this2.dError(err);
      });
    }
  }
});

/***/ }),

/***/ 194:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.finishedLoading) ? _c('scroll-view', {
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
  }, [_c('d-timeline', {
    attrs: {
      "events": _vm.events,
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('d-loading', {
    attrs: {
      "loading": _vm.loading,
      "mpcomid": '1'
    }
  }), _vm._v(" "), _c('d-no-more', {
    attrs: {
      "has-more": _vm.hasMore,
      "mpcomid": '2'
    }
  })], 1) : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-705ba5b4", esExports)
  }
}

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_705ba5b4_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(263);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(194)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-705ba5b4"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_705ba5b4_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\guide_center_experience\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-705ba5b4", Component.options)
  } else {
    hotAPI.reload("data-v-705ba5b4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(71);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
    config: {
        navigationBarTitleText: '个人中心-向导履历',
        navigationBarTextStyle: 'white',
        navigationBarBackgroundColor: '#42b970'
    }
});

/***/ })

},[97]);
//# sourceMappingURL=main.js.map