global.webpackJsonp([20],{

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_common_DInput__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_common_DTextarea__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_common_DChooseSpots__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_guide__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_const_guideConst__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_mock_guide_mock_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_const_imgConst__ = __webpack_require__(32);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        DInput: __WEBPACK_IMPORTED_MODULE_0__components_common_DInput__["a" /* default */],
        DTextArea: __WEBPACK_IMPORTED_MODULE_1__components_common_DTextarea__["a" /* default */],
        DChooseSpots: __WEBPACK_IMPORTED_MODULE_2__components_common_DChooseSpots__["a" /* default */]
    },
    data: function data() {
        return {
            editmode: false,
            guide: undefined,
            form: {
                wechat: "",
                phone: "",
                introduction: "",
                favorSpots: []
            },
            pageName: 'guide_center_info',
            hasCheck: false
        };
    },
    mounted: function mounted() {
        // 取得向导信息
        this.guide = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_4__api_const_guideConst__["j" /* GUIDE_INFO */]);
        if (!this.guide) {
            // 未取得向导信息
            var errMsg = "粗错啦QWQ没找到你的向导信息";

            // 跳回
            wx.navigateBack();

            // 显示错误信息
            this.showErrorRoast(errMsg);

            return;
        }

        // 初始化信息
        this.editmode = false;
        this.hasCheck = false;
        this.form = {
            wechat: "",
            phone: "",
            introduction: "",
            favorSpots: []

            // 保存景点信息
        };wx.setStorageSync(__WEBPACK_IMPORTED_MODULE_4__api_const_guideConst__["i" /* SELECTED_SPOTS */], this.guide.favorSpots);
    },
    onShow: function onShow() {
        if (this.editmode) {
            // 编辑模式更新负责景点
            this.dLog("编辑模式更新景点信息");
            this.form.favorSpots = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_4__api_const_guideConst__["i" /* SELECTED_SPOTS */]);
        }
    },

    computed: {
        computedGoodRate: function computedGoodRate() {
            return this.guide ? Math.round(this.guide.goodFeedbackRate) : 0;
        },
        getSpotList: function getSpotList() {
            if (!this.guide || this.guide.favorSpots.length === 0) {
                return '未选择，点击选择景点';
            } else {
                var res = this.guide.favorSpots.map(function (spot) {
                    return spot.name;
                }).reduce(function (x, y) {
                    return x + '，' + y;
                });
                return res;
            }
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
        handleStartModify: function handleStartModify(event) {
            this.dLog("修改信息", event);
            this.form.favorSpots = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_4__api_const_guideConst__["i" /* SELECTED_SPOTS */]);
            this.editmode = true;
        },
        handleSubmit: function handleSubmit(event) {
            var _this = this;

            this.dLog("修改提交", event);

            if (!this.hasCheck) {
                if (!this.checkModify()) {
                    this.dLog('修改非法');
                    return;
                }
            }

            __WEBPACK_IMPORTED_MODULE_3__api_guide__["a" /* default */].modifyUserInfo(this.guide, function (res) {
                var sucMsg = "修改成功";
                _this.dLog("修改成功", res);

                // 取得景点信息
                _this.guide.favorSpots = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_4__api_const_guideConst__["i" /* SELECTED_SPOTS */]);

                wx.setStorage({
                    key: __WEBPACK_IMPORTED_MODULE_4__api_const_guideConst__["j" /* GUIDE_INFO */],
                    data: _this.guide,
                    success: function success(suc) {
                        _this.editmode = false;

                        // 输出提示信息 
                        wx.showToast({
                            icon: 'none',
                            title: sucMsg
                        });
                    }
                });
            }, function (rej) {
                var errMsg = "修改失败";
                _this.showErrorToast(errMsg, rej);
            });
        },
        handleGetUserInfo: function handleGetUserInfo(event) {
            this.dLog("handleGetUserInfo 方法调用", event);

            if (this.checkModify()) {
                // 修改合法
                this.guide.avatar = event.target.userInfo.avatarUrl;

                this.handleSubmit(event);
            }
        },
        checkModify: function checkModify() {
            this.hasCheck = false;
            this.dLog("checkModify 方法调用", this.form);

            // 检查修改合法性
            if (!this.form.favorSpots || !this.form.favorSpots.length) {
                var errMsg = "请输入你想负责的景点";
                this.showErrorToast(errMsg);
                return false;
            }

            // 保存修改信息
            this.guide.favorSpots = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_4__api_const_guideConst__["i" /* SELECTED_SPOTS */]);

            if (this.form.wechat) {
                this.guide.wechat = this.form.wechat;
            }

            if (this.form.phone) {
                this.guide.phone = this.form.phone;
            }
            if (this.form.introduction) {
                this.guide.introduction = this.form.introduction;
            }

            this.hasCheck = true;

            return true;
        }
    }
});

/***/ }),

/***/ 173:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.guide) ? _c('div', {
    staticClass: "wrapper"
  }, [_c('div', {
    staticClass: "head"
  }, [_c('div', [_c('img', {
    staticClass: "avatar",
    attrs: {
      "src": _vm.guide.avatar,
      "alt": "头像加载失败"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "text"
  }, [_vm._v(_vm._s(_vm.guide.realName))])]), _vm._v(" "), (!_vm.editmode) ? _c('div', [_c('div', {
    staticClass: "info-item"
  }, [_c('span', {
    staticClass: "title-span"
  }, [_vm._v("微信号：")]), _vm._v(" "), _c('span', {
    staticClass: "info-span"
  }, [_vm._v(_vm._s(_vm.guide.wechat))])]), _vm._v(" "), _c('div', {
    staticClass: "info-item"
  }, [_c('span', {
    staticClass: "title-span"
  }, [_vm._v("手机号：")]), _vm._v(" "), _c('span', {
    staticClass: "info-span"
  }, [_vm._v(_vm._s(_vm.guide.phone))])]), _vm._v(" "), _c('div', {
    staticClass: "info-item"
  }, [_c('span', {
    staticClass: "title-span"
  }, [_vm._v("个人简介：")]), _vm._v(" "), _c('span', {
    staticClass: "info-span"
  }, [_vm._v(_vm._s(_vm.guide.introduction))])]), _vm._v(" "), _c('div', {
    staticClass: "info-item"
  }, [_c('span', {
    staticClass: "title-span"
  }, [_vm._v("负责景点：")]), _vm._v(" "), _c('span', {
    staticClass: "info-span"
  }, [_vm._v(_vm._s(_vm.getSpotList))])]), _vm._v(" "), _c('div', {
    staticClass: "info-item"
  }, [_c('span', {
    staticClass: "title-span"
  }, [_vm._v("好评度：")]), _vm._v(" "), _c('span', [_c('progress', {
    attrs: {
      "percent": _vm.computedGoodRate,
      "show-info": ""
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "info-wrapper button-wrapper"
  }, [_c('button', {
    attrs: {
      "type": "primary",
      "eventid": '0'
    },
    on: {
      "click": _vm.handleStartModify
    }
  }, [_vm._v("\n                修改信息\n                ")])], 1)]) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.editmode) ? _c('div', [_c('div', {
    staticClass: "item-wrapper"
  }, [_c('d-input', {
    attrs: {
      "label": "微信号",
      "placeholder": _vm.guide.wechat,
      "confirm-type": "search",
      "eventid": '1',
      "mpcomid": '0'
    },
    on: {
      "input": function($event) {
        _vm.form.wechat = $event
      }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "item-wrapper"
  }, [_c('d-input', {
    attrs: {
      "label": "手机号",
      "placeholder": _vm.guide.phone,
      "confirm-type": "search",
      "eventid": '2',
      "mpcomid": '1'
    },
    on: {
      "input": function($event) {
        _vm.form.phone = $event
      }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "item-wrapper"
  }, [_c('d-input', {
    attrs: {
      "label": "个人简介",
      "placeholder": _vm.guide.introduction,
      "confirm-type": "search",
      "eventid": '3',
      "mpcomid": '2'
    },
    on: {
      "input": function($event) {
        _vm.form.introduction = $event
      }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "item-wrapper"
  }, [_c('d-choose-spots', {
    attrs: {
      "label": "负责景点",
      "spots": _vm.form.favorSpots,
      "mpcomid": '3'
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "item-wrapper button-wrapper"
  }, [_c('button', {
    attrs: {
      "type": "primary",
      "eventid": '4'
    },
    on: {
      "click": _vm.handleSubmit
    }
  }, [_vm._v("\n            确定\n            ")])], 1), _vm._v(" "), _c('div', {
    staticClass: "item-wrapper button-wrapper"
  }, [_c('button', {
    attrs: {
      "open-type": "getUserInfo",
      "eventid": '5'
    },
    on: {
      "getuserinfo": _vm.handleGetUserInfo
    }
  }, [_vm._v("\n                授权头像信息并提交\n            ")])], 1)]) : _vm._e()])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-26df1b38", esExports)
  }
}

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_26df1b38_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(251);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(173)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-26df1b38"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_26df1b38_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\guide_center_info\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-26df1b38", Component.options)
  } else {
    hotAPI.reload("data-v-26df1b38", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(72);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
    config: {
        navigationBarTitleText: '个人中心-个人信息',
        navigationBarTextStyle: 'white',
        navigationBarBackgroundColor: '#42b970'
    }
});

/***/ })

},[98]);
//# sourceMappingURL=main.js.map