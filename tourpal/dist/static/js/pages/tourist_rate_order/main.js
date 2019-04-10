global.webpackJsonp([14],{

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(86);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
  config: {
    navigationBarTitleText: '评价'
  }
});

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_tourist__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_spot_SpotCard__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_guide_GuideProfileCard__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_common_DTextarea__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_const_touristConst__ = __webpack_require__(4);
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
    SpotCard: __WEBPACK_IMPORTED_MODULE_1__components_spot_SpotCard__["a" /* default */],
    GuideCard: __WEBPACK_IMPORTED_MODULE_2__components_guide_GuideProfileCard__["a" /* default */],
    DTextarea: __WEBPACK_IMPORTED_MODULE_3__components_common_DTextarea__["a" /* default */]
  },
  data: function data() {
    return {
      order: {},
      feedback: {
        guidePoint: 5,
        spotPoint: 5,
        comment: ''
      },
      pageName: 'tourist_rate_order'
    };
  },
  mounted: function mounted() {
    // 取得 order
    this.order = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_4__api_const_touristConst__["g" /* RATE_ORDER */]);
    if (!this.order) {
      // 跳回
      wx.navigateBack();

      // 未找到向导ID
      this.showErrorRoast('粗错啦QWQ没有找到你的邀请');
      return;
    }

    // 初始化数据
    this.feedback.guidePoint = 5;
    this.feedback.spotPoint = 5;
    this.feedback.comment = '';
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
    handleSubmitRating: function handleSubmitRating(event) {
      var _this = this;

      this.dLog('handleSubmitRating 方法响应', event);

      // 检查评价
      if (!this.feedback.comment) {
        var msg = '游客未评价';
        this.dLog(msg, this.feedback);
        wx.showModal({
          title: '\u771F\u7684\u4E0D\u8BF4\u70B9\u4EC0\u4E48\u5417',
          success: function success(res) {
            if (res.confirm) {
              // 如果没有评价，提供默认评价
              _this.dLog('确认拒绝', res);
              _this.feedback.comment = '游客未评价';
            } else {
              // 拒绝，继续评价
              return;
            }
          }
        });

        return;
      }

      // 发起网络请求
      this.postHttpRating();
    },
    postHttpRating: function postHttpRating() {
      var _this2 = this;

      this.dLog('postHttpRating 方法响应');

      // 发起网络请求
      __WEBPACK_IMPORTED_MODULE_0__api_tourist__["a" /* default */].commendOrder(this.order.id, this.feedback, function (res) {
        _this2.dLog('提交评价成功', res, _this2.feedback);

        // 跳回
        wx.navigateBack();

        // 显示提示信息
        wx.showToast({
          title: '评价订单成功',
          icon: 'none'
        });
      }, function (err) {
        var errMsg = '评价订单失败了，请稍后重试';

        _this2.dLog(errMsg, err, _this2.feedback);

        wx.showToast({
          title: errMsg,
          icon: 'none'
        });
      });
    },
    handleSpotPointChange: function handleSpotPointChange(event) {
      this.dLog("handleSpotPointChange 方法响应", event);
      this.feedback.spotPoint = event.target ? event.target.value : '';
      this.dLog("feedback属性改变", this.feedback);
    },
    handleGuidePointChange: function handleGuidePointChange(event) {
      this.dLog("handleGuidePointChange 方法响应", event);
      this.feedback.guidePoint = event.target ? event.target.value : '';
      this.dLog("feedback属性改变", this.feedback);
    },
    handleCommentChange: function handleCommentChange(event) {
      this.dLog("handleCommentChange 方法响应", event);
      this.feedback.comment = event;
      this.dLog("feedback属性改变", this.feedback);
    }
  }
});

/***/ }),

/***/ 160:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "out"
    }
  }, [(_vm.order.spot) ? _c('div', {
    staticClass: "rate-item",
    attrs: {
      "id": "rate-spot"
    }
  }, [_c('spot-card', {
    attrs: {
      "spot": _vm.order.spot,
      "noAction": true,
      "mpcomid": '0'
    }
  })], 1) : _vm._e(), _vm._v(" "), (_vm.order.guide) ? _c('div', {
    staticClass: "rate-item",
    attrs: {
      "id": "rate-guide"
    }
  }, [_c('guide-card', {
    attrs: {
      "guide": _vm.order.guide,
      "invitable": false,
      "mpcomid": '1'
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('div', [_c('div', {
    staticClass: "form-item"
  }, [_c('span', {
    staticClass: "label"
  }, [_vm._v("给景点评分")]), _vm._v(" "), _c('slider', {
    attrs: {
      "min": 0,
      "max": 5,
      "show-value": "",
      "value": "5",
      "eventid": '0'
    },
    on: {
      "change": _vm.handleSpotPointChange
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-item"
  }, [_c('span', {
    staticClass: "label"
  }, [_vm._v("给向导评分")]), _vm._v(" "), _c('slider', {
    attrs: {
      "min": 0,
      "max": 5,
      "show-value": "",
      "value": "5",
      "eventid": '1'
    },
    on: {
      "change": _vm.handleGuidePointChange
    }
  })])]), _vm._v(" "), _c('d-textarea', {
    attrs: {
      "label": "留言",
      "placeholder": "请留下你对这次旅行的看法",
      "eventid": '2',
      "mpcomid": '2'
    },
    on: {
      "input": _vm.handleCommentChange
    }
  }), _vm._v(" "), _c('div', {
    attrs: {
      "id": "btn-wrapper"
    }
  }, [_c('button', {
    attrs: {
      "type": "primary",
      "eventid": '3'
    },
    on: {
      "click": _vm.handleSubmitRating
    }
  }, [_vm._v("确定")])], 1)], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-02fe1aa2", esExports)
  }
}

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_02fe1aa2_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(244);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(160)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-02fe1aa2"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_02fe1aa2_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\tourist_rate_order\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-02fe1aa2", Component.options)
  } else {
    hotAPI.reload("data-v-02fe1aa2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ })

},[112]);
//# sourceMappingURL=main.js.map