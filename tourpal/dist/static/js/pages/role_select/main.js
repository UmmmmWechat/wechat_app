global.webpackJsonp([19],{

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(76);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
    config: {
        navigationBarTitleText: '欢迎，请问你是？'
    }
});

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_url__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_guide__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_tourist__ = __webpack_require__(6);
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
  data: function data() {
    return {
      touristPrompot: {
        title: "游客",
        extra: "我达达的马蹄，美丽的错误"
      },
      guidePrompt: {
        title: "向导",
        extra: "守着这一方水土，等待着谁的到来"
      },
      pageName: "role_select"
    };
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
    handleChooseTourist: function handleChooseTourist() {
      var _this = this;

      // 选择游客
      this.dLog('选择了游客');

      __WEBPACK_IMPORTED_MODULE_2__api_tourist__["a" /* default */].logIn(function (suc) {
        // resolve
        _this.dLog('游客登录成功', suc);

        var url = '/' + __WEBPACK_IMPORTED_MODULE_0__pages_url__["k" /* TOURIST_MAIN */];
        _this.dLog('跳转', url);
        wx.redirectTo({ url: url });
      }, function (fai) {
        _this.showErrorToast("游客登录失败", fai);
      });
    },
    handleChooseGuide: function handleChooseGuide() {
      var _this2 = this;

      // 选择向导
      this.dLog('选择了向导');

      __WEBPACK_IMPORTED_MODULE_1__api_guide__["a" /* default */].logIn(function (res) {
        // resolve
        _this2.dLog('向导登录成功', res);

        if (res.isNewGuide) {
          var url = '/' + __WEBPACK_IMPORTED_MODULE_0__pages_url__["l" /* GUIDE_SIGN_UP */];
          _this2.dLog('跳转', url);
          wx.navigateTo({ url: url });
        } else {
          var _url = '/' + __WEBPACK_IMPORTED_MODULE_0__pages_url__["m" /* GUIDE_MAIN */];
          _this2.dLog('跳转', _url);
          wx.switchTab({ url: _url });
        }
      }, function (fai) {
        _this2.showErrorToast("向导登录失败", fai);
      });
    }
  }
});

/***/ }),

/***/ 177:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "role-card",
    attrs: {
      "id": "tourist-role-card",
      "eventid": '0'
    },
    on: {
      "click": _vm.handleChooseTourist
    }
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.touristPrompot.title))]), _vm._v(" "), _c('p', {
    staticClass: "extra"
  }, [_vm._v(_vm._s(_vm.touristPrompot.extra))])], 1), _vm._v(" "), _c('div', {
    staticClass: "role-card",
    attrs: {
      "id": "guide-role-card",
      "eventid": '1'
    },
    on: {
      "click": _vm.handleChooseGuide
    }
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.guidePrompt.title))]), _vm._v(" "), _c('p', {
    staticClass: "extra"
  }, [_vm._v(_vm._s(_vm.guidePrompt.extra))])], 1)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-32281088", esExports)
  }
}

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_32281088_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(254);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(177)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-32281088"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_32281088_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\role_select\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-32281088", Component.options)
  } else {
    hotAPI.reload("data-v-32281088", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ })

},[102]);
//# sourceMappingURL=main.js.map