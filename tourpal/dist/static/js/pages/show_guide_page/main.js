global.webpackJsonp([17],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(78);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
    config: {
        navigationBarTitleText: '导游详情',
        navigationBarTextStyle: 'white',
        navigationBarBackgroundColor: '#42b970'
    }
});

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_const_touristConst__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_common__ = __webpack_require__(8);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      pageName: "show_guide_page",
      guide: {},
      phoneActionSheetItemList: ['拨打电话', '保存到联系人'],
      wechatActionSheetItemList: ['复制到剪贴板']
    };
  },
  mounted: function mounted() {
    // 取得 Guide
    this.guide = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_0__api_const_touristConst__["p" /* CHECK_GUIDE */]);
    if (!this.guide) {
      // 跳回
      wx.navigateBack();

      // 未找到向导ID
      this.showErrorRoast("粗错啦QWQ没有找到你要的向导");
      return;
    }
  },

  methods: {
    handleClickPhone: function handleClickPhone() {
      var _this = this;

      wx.showActionSheet({
        itemList: this.phoneActionSheetItemList,
        success: function success(res) {
          switch (res.tapIndex) {
            case 0:
              _this.dLog('make phone call');
              wx.makePhoneCall({
                phoneNumber: _this.guide.phone
              });
              break;
            case 1:
              wx.addPhoneContact({
                mobilePhoneNumber: _this.guide.phone
              });
              break;
            default:
              break;
          }
        }
      });
    },
    handleClickWechat: function handleClickWechat() {
      var _this2 = this;

      wx.showActionSheet({
        itemList: this.wechatActionSheetItemList,
        success: function success(res) {
          switch (res.tabIndex) {
            case 0:
              wx.setClipboardData({
                data: _this2.guide.wechat,
                success: function success(res) {
                  wx.showToast({
                    title: '已复制到剪贴板'
                  });
                },
                fail: function fail(err) {
                  _this2.dError(err);
                }
              });
              break;
            default:
              break;
          }
        }
      });
    },
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
    }
  }
});

/***/ }),

/***/ 208:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', [_c('div', {
    staticStyle: {
      "text-align": "center",
      "margin": "20px"
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.guide.avatar
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "name-wrapper"
  }, [_vm._v("\r\n    " + _vm._s(_vm.guide.realName) + "\r\n  ")]), _vm._v(" "), _c('div', {
    staticClass: "content-wrapper"
  }, [_c('div', {
    staticClass: "item-wrapper"
  }, [_c('span', {
    staticClass: "title-span"
  }, [_vm._v("好评率：")]), _vm._v(" "), _c('progress', {
    attrs: {
      "percent": _vm.guide.goodFeedbackRate,
      "show-info": ""
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "item-wrapper"
  }, [_c('span', {
    staticClass: "title-span"
  }, [_vm._v("性别：")]), _vm._v(_vm._s(_vm.guide.gender))]), _vm._v(" "), _c('div', {
    staticClass: "item-wrapper"
  }, [_c('span', {
    staticClass: "title-span"
  }, [_vm._v("\r\n        微信：\r\n      ")]), _vm._v(" "), _c('span', {
    staticStyle: {
      "text-decoration": "underline"
    },
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.handleClickWechat
    }
  }, [_vm._v("\r\n        " + _vm._s(_vm.guide.wechat) + "\r\n      ")])]), _vm._v(" "), _c('div', {
    staticClass: "item-wrapper"
  }, [_c('span', {
    staticClass: "title-span"
  }, [_vm._v("\r\n        电话：\r\n      ")]), _vm._v(" "), _c('span', {
    staticStyle: {
      "text-decoration": "underline"
    },
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.handleClickPhone
    }
  }, [_vm._v("\r\n        " + _vm._s(_vm.guide.phone) + "\r\n      ")])]), _vm._v(" "), _c('div', {
    staticClass: "item-wrapper"
  }, [_c('span', {
    staticClass: "title-span"
  }, [_vm._v("自我介绍：")]), _vm._v(_vm._s(_vm.guide.introduction))])])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-9a79a552", esExports)
  }
}

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_9a79a552_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(270);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(208)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-9a79a552"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_9a79a552_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\show_guide_page\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9a79a552", Component.options)
  } else {
    hotAPI.reload("data-v-9a79a552", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ })

},[104]);
//# sourceMappingURL=main.js.map