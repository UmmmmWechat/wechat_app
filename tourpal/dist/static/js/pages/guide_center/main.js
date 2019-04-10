global.webpackJsonp([6],{

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_guide__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_const_guideConst__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_pages_url__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_const_imgConst__ = __webpack_require__(32);
//
//
//
//
//
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
            avatar: __WEBPACK_IMPORTED_MODULE_3__api_const_imgConst__["a" /* MOCK_USER_AVATOR_URL */],
            realName: "体验向导",
            guideId: "",
            componentName: 'ProfileCard'
        };
    },
    mounted: function mounted() {
        var _this = this;

        // 取得向导信息
        var guide = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_1__api_const_guideConst__["j" /* GUIDE_INFO */]);
        this.guideId = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_1__api_const_guideConst__["e" /* GUIDE_ID */]);

        if (!guide) {
            // 取得本地缓存信息失败
            if (!this.guideId) {
                // 登录过期，重新登录
                this.reLogin();
            } else {
                __WEBPACK_IMPORTED_MODULE_0__api_guide__["a" /* default */].queryUserInfo(this.guideId, function (res) {
                    _this.dLog("取得向导信息成功");
                    _this.setGuideInfo(res);
                }, function (rej) {
                    var errMsg = "取得向导信息失败";
                    _this.showErrorRoast(errMsg);
                });
            }
        } else {
            if (this.guideId !== guide.id) {
                // 登录过期，重新登录
                this.reLogin();
            } else {
                // 设置信息
                this.setGuideInfo(guide);
            }
        }
    },
    onShow: function onShow() {
        this.dLog('onshow');
        var guide = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_1__api_const_guideConst__["j" /* GUIDE_INFO */]);
        this.setGuideInfo(guide);
    },

    methods: {
        dLog: function dLog(message) {
            for (var _len = arguments.length, optionalParams = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                optionalParams[_key - 1] = arguments[_key];
            }

            console.log(this.componentName, message, optionalParams);
        },
        dError: function dError(message) {
            for (var _len2 = arguments.length, optionalParams = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                optionalParams[_key2 - 1] = arguments[_key2];
            }

            console.error(this.componentName, message, optionalParams);
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
        setGuideInfo: function setGuideInfo(guide) {
            this.dLog("setGuideInfo 方法调用", guide);

            this.avatar = guide.avatar;
            this.realName = guide.realName;
            this.guideId = guide.id;

            // 存储更新向导信息
            wx.setStorage({
                key: __WEBPACK_IMPORTED_MODULE_1__api_const_guideConst__["j" /* GUIDE_INFO */],
                data: guide
            });
        },
        reLogin: function reLogin() {
            this.dLog("reLogin 方法调用");

            // 取得向导ID失败
            var url = '/' + __WEBPACK_IMPORTED_MODULE_2__pages_pages_url__["c" /* ROLE_SELECT */];
            this.dLog('跳转', url);
            wx.navigateTo({ url: url });

            // 输出提示信息 
            wx.showToast({
                icon: 'none',
                title: "登录过期请重新登录w"
            });
        }
    }
});

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_guide_ProfileCard__ = __webpack_require__(236);
//
//
//
//
//
//
//
//
//
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
    GuideProfileCard: __WEBPACK_IMPORTED_MODULE_0__components_guide_ProfileCard__["a" /* default */]
  },
  methods: {
    handleToInfo: function handleToInfo(event) {
      console.log("向导个人中心-个人信息");
      wx.navigateTo({
        url: "../guide_center_info/main"
      });
    },
    handleToReview: function handleToReview(event) {
      console.log("向导个人中心-向导履历");
      wx.navigateTo({
        url: "../guide_center_experience/main"
      });
    }
  }
});

/***/ }),

/***/ 168:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 218:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_ProfileCard_vue__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_b90117dc_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_ProfileCard_vue__ = __webpack_require__(276);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(218)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-b90117dc"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_ProfileCard_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_b90117dc_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_ProfileCard_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\guide\\ProfileCard.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ProfileCard.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b90117dc", Component.options)
  } else {
    hotAPI.reload("data-v-b90117dc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "out"
    }
  }, [_c('div', {
    attrs: {
      "id": "profile"
    }
  }, [_c('guide-profile-card', {
    attrs: {
      "mpcomid": '0'
    }
  })], 1), _vm._v(" "), _c('div', {
    attrs: {
      "id": "operation"
    }
  }, [_c('div', {
    staticClass: "op-item",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.handleToInfo
    }
  }, [_vm._v("个人信息")]), _vm._v(" "), _c('div', {
    staticClass: "op-item",
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.handleToReview
    }
  }, [_vm._v("向导履历")])])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-18f2fb6a", esExports)
  }
}

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper"
  }, [_c('div', [_c('img', {
    staticClass: "avatar",
    attrs: {
      "src": _vm.avatar,
      "alt": "头像加载失败"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "text"
  }, [_vm._v(_vm._s(_vm.realName))])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-b90117dc", esExports)
  }
}

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_18f2fb6a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(247);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(168)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-18f2fb6a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_18f2fb6a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\guide_center\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-18f2fb6a", Component.options)
  } else {
    hotAPI.reload("data-v-18f2fb6a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(70);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
    config: {
        navigationBarTitleText: '个人中心',
        navigationBarTextStyle: 'white',
        navigationBarBackgroundColor: '#42b970'
    }
});

/***/ })

},[96]);
//# sourceMappingURL=main.js.map