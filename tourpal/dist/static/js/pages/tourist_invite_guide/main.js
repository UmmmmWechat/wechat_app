global.webpackJsonp([4],{

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(83);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
  config: {
    navigationBarTitleText: '邀请向导'
  }
});

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export formatTime */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return formatDate; });
function formatNumber(n) {
    var str = n.toString();
    return str[1] ? str : '0' + str;
}

function formatTime(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    var t1 = [year, month, day].map(formatNumber).join('/');
    var t2 = [hour, minute, second].map(formatNumber).join(':');

    return t1 + ' ' + t2;
}

var formatDate = function formatDate(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
};



/***/ }),

/***/ 127:
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
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
});

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_guide_GuideProfileCard__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_common_DTextarea__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_common_DTitledText__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_common_DDatePicker__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_tourist__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_mock_guide_mock_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_const_guideConst__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_dUtils__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__api_const_spotConst__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__api_const_touristConst__ = __webpack_require__(4);
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
    GuideProfileCard: __WEBPACK_IMPORTED_MODULE_0__components_guide_GuideProfileCard__["a" /* default */],
    DTextarea: __WEBPACK_IMPORTED_MODULE_1__components_common_DTextarea__["a" /* default */],
    DTitledText: __WEBPACK_IMPORTED_MODULE_2__components_common_DTitledText__["a" /* default */],
    DDatePicker: __WEBPACK_IMPORTED_MODULE_3__components_common_DDatePicker__["a" /* default */]
  },
  data: function data() {
    return {
      guide: __WEBPACK_IMPORTED_MODULE_5__api_mock_guide_mock_data__["a" /* mockGuide */],

      start: '1900-01-01',
      end: '2200-01-01',

      // form相关
      spotId: 'spotId',
      spotName: "spotName",
      touristId: "touristId",
      travelDate: undefined,
      message: undefined,

      pageName: 'tourist_invite_guide'
    };
  },
  mounted: function mounted() {
    // 取得 向导信息
    this.guide = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_6__api_const_guideConst__["a" /* INVITE_GUIDE_INFO */]);
    if (!this.guide) {
      var errMsg = "向导信息获取失败";
      this.mountedError(errMsg, fai);
      return;
    }

    // 取得 景点ID
    this.spotId = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_8__api_const_spotConst__["a" /* D_SPOT_ID */]);
    if (!this.spotId) {
      var _errMsg = "取得景点ID失败";
      this.mountedError(_errMsg, fai);
      return;
    }

    // 取得 景点名称
    this.spotName = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_8__api_const_spotConst__["b" /* D_SPOT_NAME */]);
    if (!this.spotName) {
      var _errMsg2 = "取得景点名称失败";
      this.mountedError(_errMsg2, fai);
      return;
    }

    // 取得 游客ID
    this.touristId = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_9__api_const_touristConst__["a" /* TOURIST_ID */]);
    if (!this.touristId) {
      var _errMsg3 = "取得游客ID失败";
      this.mountedError(_errMsg3, fai);
      return;
    }

    // 设置时间区间
    var startDate = new Date();
    var endDate = new Date();
    endDate.setDate(startDate.getDate() + 28);
    this.start = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_dUtils__["a" /* formatDate */])(startDate);
    this.end = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_dUtils__["a" /* formatDate */])(endDate);
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
    mountedError: function mountedError(errMsg, fai) {
      this.dError(errMsg, fai);

      wx.navigateBack();

      // 输出提示信息 
      wx.showToast({
        icon: 'none',
        title: errMsg
      });
    },
    handleDateChanged: function handleDateChanged(e) {
      this.dLog("handleDateChanged 方法调用", e);
      this.travelDate = new Date(e);
      this.dLog('travelDate \u66F4\u65B0 ' + this.travelDate);
    },
    handleInput: function handleInput(e) {
      this.dLog("handleInput 方法调用", e);
      this.message = e;
      this.dLog('message \u66F4\u65B0 ' + this.message);
    },
    handleSubmit: function handleSubmit(e) {
      var _this = this;

      this.dLog("handleSubmit 方法调用", e);

      // 获取formId
      var formId = e.target.formId;

      if (!this.travelDate) {
        var errMsg = "请选择旅行时间w";
        this.dError(errMsg);

        // 输出提示信息 
        wx.showToast({
          icon: 'none',
          title: errMsg
        });

        return;
      }

      if (!this.message) {
        var _errMsg4 = "跟向导说点啥邀请成功的机率更高哟w";
        this.dError(_errMsg4);

        // 输出提示信息 
        wx.showToast({
          icon: 'none',
          title: _errMsg4
        });

        return;
      }

      var order = {
        touristId: this.touristId,
        guideId: this.guide.id,
        spotId: this.spotId,
        generatedDate: new Date(),
        travelDate: this.travelDate,
        message: this.message
      };

      this.dLog("生成表单", order);

      __WEBPACK_IMPORTED_MODULE_4__api_tourist__["a" /* default */].newOrder(order, formId, function (res) {
        var sucMsg = "发起邀请成功";
        _this.dLog(sucMsg, res);

        // 跳回
        setTimeout(function () {
          wx.navigateBack({
            delta: 2
          });
        }, 800);

        // 输出提示信息 
        wx.showToast({
          icon: 'none',
          title: sucMsg
        });
      }, function (rej) {
        var errMsg = "发起邀请失败";
        _this.dError(errMsg, rej);

        // 输出提示信息 
        wx.showToast({
          icon: 'none',
          title: errMsg
        });
      });
    }
  }
});

/***/ }),

/***/ 174:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 175:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 182:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_DTitledText_vue__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_28e0875d_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_DTitledText_vue__ = __webpack_require__(252);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(174)
  __webpack_require__(175)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-28e0875d"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_DTitledText_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_28e0875d_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_DTitledText_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\common\\DTitledText.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] DTitledText.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-28e0875d", Component.options)
  } else {
    hotAPI.reload("data-v-28e0875d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "wrapper"
    }
  }, [_c('div', {
    staticClass: "label"
  }, [_vm._v("\n      " + _vm._s(_vm.title) + "\n    ")]), _vm._v(" "), _c('div', {
    staticStyle: {
      "'text-align'": "left",
      "padding": "5rpx"
    }
  }, [_vm._v("\n      " + _vm._s(_vm.text) + "\n    ")])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-28e0875d", esExports)
  }
}

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "out"
    }
  }, [_c('div', {
    attrs: {
      "id": "profile-wrapper"
    }
  }, [_c('guide-profile-card', {
    attrs: {
      "invitable": false,
      "guide": _vm.guide,
      "mpcomid": '0'
    }
  })], 1), _vm._v(" "), _c('div', {
    attrs: {
      "id": "form-wrapper"
    }
  }, [_c('form', {
    attrs: {
      "report-submit": "",
      "eventid": '2'
    },
    on: {
      "submit": _vm.handleSubmit
    }
  }, [_c('d-titled-text', {
    attrs: {
      "title": "旅游地点",
      "text": _vm.spotName,
      "mpcomid": '1'
    }
  }), _vm._v(" "), _c('d-date-picker', {
    attrs: {
      "label": "旅游日期",
      "prompt": "可预约四周内的时间",
      "start": _vm.start,
      "end": _vm.end,
      "eventid": '0',
      "mpcomid": '2'
    },
    on: {
      "on-change": _vm.handleDateChanged
    }
  }), _vm._v(" "), _c('d-textarea', {
    attrs: {
      "label": "留言",
      "placeholder": "请给向导留个言吧",
      "eventid": '1',
      "mpcomid": '3'
    },
    on: {
      "input": _vm.handleInput
    }
  }), _vm._v(" "), _c('button', {
    staticStyle: {
      "margin": "10rpx"
    },
    attrs: {
      "formType": "submit",
      "type": "primary"
    }
  }, [_vm._v("\n        确定\n      ")])], 1)], 1)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-439e9fc6", esExports)
  }
}

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_439e9fc6_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(257);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(182)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-439e9fc6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_439e9fc6_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\tourist_invite_guide\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-439e9fc6", Component.options)
  } else {
    hotAPI.reload("data-v-439e9fc6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ })

},[109]);
//# sourceMappingURL=main.js.map