global.webpackJsonp([10],{

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_common_DLoading__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_guide__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_const_guideConst__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    DLoading: __WEBPACK_IMPORTED_MODULE_0__components_common_DLoading__["a" /* default */]
  },
  data: function data() {
    return {
      order: undefined,
      loading: false,
      waiting: __WEBPACK_IMPORTED_MODULE_2__api_const_guideConst__["b" /* STATES_ARRAY */][__WEBPACK_IMPORTED_MODULE_2__api_const_guideConst__["c" /* WAITING_STATE */]],
      pageName: 'guide_check_order'
    };
  },

  computed: {
    computedTravelDate: function computedTravelDate() {
      if (!this.order) return '';
      return new Date(this.order.travelDate).toLocaleDateString();
    },
    computedCreatedDate: function computedCreatedDate() {
      if (!this.order) return '';
      return new Date(this.order.generatedDate).toLocaleDateString();
    }
  },
  mounted: function mounted() {
    // 取得order
    this.loading = true;

    this.order = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_2__api_const_guideConst__["d" /* SELECTED_ORDER_INFO */]);
    if (!this.order) {
      // 取得order信息失败
      var errMsg = "粗错啦QWQ没找到这条邀请";
      // 跳回
      wx.navigateBack();
      // 显示提示信息
      this.showErrorRoast(errMsg);

      return;
    }

    this.dLog("取得order信息成功", this.order);
    this.loading = false;
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
    handleReject: function handleReject(event) {
      var _this = this;

      this.dLog("handleReject 方法调用", event);

      wx.showModal({
        title: '确定要拒绝这个邀请么？',
        success: function success(res) {
          if (res.confirm) {
            _this.dLog("确认拒绝", res);
            // api
            __WEBPACK_IMPORTED_MODULE_1__api_guide__["a" /* default */].rejectOrder(_this.order.id, function (res) {
              // 跳回
              wx.navigateBack();

              wx.showToast({
                title: '邀请拒绝成功',
                icon: 'none'
              });
            }, function (err) {
              var title = '';
              if (err === ResultMessage.ALREADY_CANCELED) {
                title = '邀请已经被撤回';
              } else {
                title = '拒绝失败，请重试';
              }
              // 跳回
              wx.navigateBack();

              wx.showToast({
                title: title,
                icon: 'none'
              });
            });
          }
        }
      });
    },
    handleAccept: function handleAccept(event) {
      var _this2 = this;

      this.dLog("handleAccept 方法调用", event);

      wx.showModal({
        title: '确定要接受这个邀请么？',
        success: function success(res) {
          if (res.confirm) {
            _this2.dLog("确认接受", res);
            // api
            __WEBPACK_IMPORTED_MODULE_1__api_guide__["a" /* default */].acceptOrder(_this2.order.id, function (res) {
              // 跳回
              wx.navigateBack();

              wx.showToast({
                title: '接受成功 请耐心等待',
                icon: 'none'
              });
            }, function (err) {
              var title = '';
              if (err === ResultMessage.ALREADY_CANCELED) {
                title = '邀请已经被撤回';
              } else {
                title = '接受失败，请重试';
              }
              // 跳回
              wx.navigateBack();

              wx.showToast({
                title: title,
                icon: 'none'
              });
            });
          }
        }
      });
    }
  }
});

/***/ }),

/***/ 209:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 210:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    attrs: {
      "id": "page"
    }
  }, [_c('d-loading', {
    attrs: {
      "loading": _vm.loading,
      "mpcomid": '0'
    }
  }), _vm._v(" "), (_vm.order && !_vm.loading) ? _c('section', [_c('section', {
    attrs: {
      "id": "info-section"
    }
  }, [_c('section', {
    staticClass: "info-item"
  }, [_c('span', {
    staticClass: "title-span"
  }, [_vm._v("邀请编号：")]), _vm._v(" "), _c('span', {
    staticClass: "value-span"
  }, [_vm._v(_vm._s(_vm.order.id))])]), _vm._v(" "), _c('section', {
    staticClass: "info-item"
  }, [_c('span', {
    staticClass: "title-span"
  }, [_vm._v("邀请状态：")]), _vm._v(" "), _c('span', {
    staticClass: "value-span"
  }, [_vm._v(_vm._s(_vm.order.state))])]), _vm._v(" "), _c('section', {
    staticClass: "info-item"
  }, [_c('span', {
    staticClass: "title-span"
  }, [_vm._v("游客编号：")]), _vm._v(" "), _c('span', {
    staticClass: "value-span"
  }, [_vm._v(_vm._s(_vm.order.touristId))])]), _vm._v(" "), _c('section', {
    staticClass: "info-item"
  }, [_c('span', {
    staticClass: "title-span"
  }, [_vm._v("景点名称：")]), _vm._v(" "), _c('span', {
    staticClass: "value-span"
  }, [_vm._v(_vm._s(_vm.order.spotName))])]), _vm._v(" "), _c('section', {
    staticClass: "info-item"
  }, [_c('span', {
    staticClass: "title-span"
  }, [_vm._v("提交日期：")]), _vm._v(" "), _c('span', {
    staticClass: "value-span"
  }, [_vm._v(_vm._s(_vm.computedCreatedDate))])]), _vm._v(" "), _c('section', {
    staticClass: "info-item"
  }, [_c('span', {
    staticClass: "title-span"
  }, [_vm._v("旅行日期：")]), _vm._v(" "), _c('span', {
    staticClass: "value-span"
  }, [_vm._v(_vm._s(_vm.computedTravelDate))])]), _vm._v(" "), _c('section', {
    staticClass: "info-item"
  }, [_c('span', {
    staticClass: "title-span"
  }, [_vm._v("邀请留言：")]), _vm._v(" "), _c('span', {
    staticClass: "value-span"
  }, [_vm._v(_vm._s(_vm.order.message))])])], 1), _vm._v(" "), (_vm.order.state === _vm.waiting) ? _c('footer', [_c('button', {
    staticClass: "op-btn",
    attrs: {
      "size": "mini",
      "eventid": '0'
    },
    on: {
      "click": _vm.handleReject
    }
  }, [_vm._v("\r\n        婉拒\r\n      ")]), _vm._v(" "), _c('button', {
    staticClass: "d-a op-btn",
    attrs: {
      "size": "mini",
      "eventid": '1'
    },
    on: {
      "click": _vm.handleAccept
    }
  }, [_vm._v("\r\n        同意\r\n      ")])], 1) : _vm._e()], 1) : _vm._e()], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-a0c05912", esExports)
  }
}

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_a0c05912_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(271);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(209)
  __webpack_require__(210)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-a0c05912"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_a0c05912_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\guide_check_order\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a0c05912", Component.options)
  } else {
    hotAPI.reload("data-v-a0c05912", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(73);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
    config: {
        navigationBarTitleText: '邀请查看',
        navigationBarTextStyle: 'white',
        navigationBarBackgroundColor: '#42b970'
    }
});

/***/ })

},[99]);
//# sourceMappingURL=main.js.map