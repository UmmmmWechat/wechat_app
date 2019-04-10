global.webpackJsonp([3],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(75);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
  config: {
    navigationBarTitleText: '注册成为引路人',
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#42b970'
  }
});

/***/ }),

/***/ 117:
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
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    props: {
        label: {
            type: String,
            default: ''
        }
    },
    data: function data() {
        return {
            info: '未选择，点击打开地图选点'
        };
    },

    methods: {
        handleChooseLocation: function handleChooseLocation(event) {
            var _this = this;

            wx.chooseLocation({
                success: function success(res) {
                    console.log(res);
                    var location = {
                        name: res.name,
                        address: res.address,
                        latitude: res.latitude,
                        longitude: res.longitude
                    };
                    _this.info = res.name;
                    event.target.value = location;
                    _this.$emit('on-location-chosen', event);
                }
            });
        }
    }
});

/***/ }),

/***/ 124:
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
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    props: {
        label: {
            type: String,
            default: ''
        },
        range: {
            type: Array,
            default: []
        }
    },
    data: function data() {
        return {
            result: '未选择，点击开始选择'
        };
        JSON.parse(false);
    },

    methods: {
        handleChange: function handleChange(event) {
            console.log(event);
            this.result = this.range[event.target.value];
            event.target.value = this.result;
            this.$emit('on-change', event);
        }
    }
});

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_common_DInput__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_common_DTextarea__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_common_DChooseLocation__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_common_DSelector__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_common_DChooseSpots__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_guide__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_url__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__api_const_guideConst__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    DTextarea: __WEBPACK_IMPORTED_MODULE_1__components_common_DTextarea__["a" /* default */],
    DChooseLocation: __WEBPACK_IMPORTED_MODULE_2__components_common_DChooseLocation__["a" /* default */],
    DChooseSpots: __WEBPACK_IMPORTED_MODULE_4__components_common_DChooseSpots__["a" /* default */],
    DSelector: __WEBPACK_IMPORTED_MODULE_3__components_common_DSelector__["a" /* default */]
  },
  data: function data() {
    return {
      gender: ['男', '女'],
      form: {
        realName: '',
        idCard: '',
        gender: '',
        favorSpots: [],
        wechat: '',
        phone: '',
        introduction: ''
      },
      pageName: 'guide_sign_up'
    };
  },
  onShow: function onShow() {
    this.dLog("onShow 方法响应");
    this.refreshFavorSpots();
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
    handleSexChange: function handleSexChange(event) {
      this.dLog("handleSexChange 方法响应", event);
      this.form.gender = event.target.value;
    },
    refreshFavorSpots: function refreshFavorSpots() {
      this.dLog("refreshFavorSpots 方法响应");
      this.form.favorSpots.splice(0, this.form.favorSpots.length); // 清空原 spot 数组

      this.form.favorSpots = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_7__api_const_guideConst__["i" /* SELECTED_SPOTS */]);
      if (!this.form.favorSpots) {
        this.dLog("没找到 favorSpots");
        this.form.favorSpots = [];
      }
    },
    handleSubmit: function handleSubmit(event) {
      var _this = this;

      this.dLog("handleSubmit 方法响应", event, this.form);

      // 检查表单项
      if (!this.form.realName) {
        var errMsg = "请输入你的真实姓名";
        this.showErrorToast(errMsg);
        return;
      } else if (!this.form.idCard) {
        var _errMsg = "请输入你的身份证号";
        this.showErrorToast(_errMsg);
        return;
      } else if (!this.form.gender) {
        var _errMsg2 = "请输入你的性别";
        this.showErrorToast(_errMsg2);
        return;
      } else if (!this.form.favorSpots || !this.form.favorSpots.length) {
        var _errMsg3 = "请输入你想负责的景点";
        this.showErrorToast(_errMsg3);
        return;
      } else if (!this.form.wechat) {
        var _errMsg4 = "请输入你的微信号";
        this.showErrorToast(_errMsg4);
        return;
      } else if (!this.form.phone) {
        var _errMsg5 = "请输入你的手机号";
        this.showErrorToast(_errMsg5);
        return;
      } else if (!this.form.introduction) {
        var _errMsg6 = "请简短地介绍下自己";
        this.showErrorToast(_errMsg6);
        return;
      }

      // 发起注册请求
      __WEBPACK_IMPORTED_MODULE_5__api_guide__["a" /* default */].signUp(this.form, function (res) {
        var sucMsg = "成功注册";
        _this.dLog(sucMsg);

        var url = '/' + __WEBPACK_IMPORTED_MODULE_6__pages_url__["m" /* GUIDE_MAIN */];
        _this.dLog('跳转', url);
        wx.switchTab({ url: url });

        // 输出提示信息 
        wx.showToast({
          icon: 'none',
          title: sucMsg
        });

        // 清空选中的景点
        wx.removeStorage({
          key: __WEBPACK_IMPORTED_MODULE_7__api_const_guideConst__["i" /* SELECTED_SPOTS */]
        });
      }, function (err) {
        _this.showErrorToast(err);
      });
    }
  }
});

/***/ }),

/***/ 169:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 170:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 171:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 224:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 225:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_DChooseLocation_vue__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_1a30b320_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_DChooseLocation_vue__ = __webpack_require__(248);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(169)
  __webpack_require__(170)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1a30b320"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_DChooseLocation_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_1a30b320_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_DChooseLocation_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\common\\DChooseLocation.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] DChooseLocation.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1a30b320", Component.options)
  } else {
    hotAPI.reload("data-v-1a30b320", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_DSelector_vue__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_d3a5d23a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_DSelector_vue__ = __webpack_require__(280);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(224)
  __webpack_require__(225)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-d3a5d23a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_DSelector_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_d3a5d23a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_DSelector_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\common\\DSelector.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] DSelector.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d3a5d23a", Component.options)
  } else {
    hotAPI.reload("data-v-d3a5d23a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "wrapper"
    }
  }, [(_vm.label !== '') ? _c('div', {
    staticClass: "label"
  }, [_vm._v("\n        " + _vm._s(_vm.label) + "\n    ")]) : _vm._e(), _vm._v(" "), _c('div', {
    attrs: {
      "id": "input-wrapper"
    }
  }, [_c('div', {
    staticClass: "info",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.handleChooseLocation
    }
  }, [_vm._v("\n              " + _vm._s(_vm.info) + "\n          ")])])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-1a30b320", esExports)
  }
}

/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "item-wrapper"
  }, [_c('d-input', {
    attrs: {
      "placeholder": "请输入你的真实姓名",
      "label": "真实姓名",
      "eventid": '0',
      "mpcomid": '0'
    },
    on: {
      "input": function($event) {
        _vm.form.realName = $event
      }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "item-wrapper"
  }, [_c('d-input', {
    attrs: {
      "placeholder": "用于实名登记检验",
      "label": "身份证号",
      "eventid": '1',
      "mpcomid": '1'
    },
    on: {
      "input": function($event) {
        _vm.form.idCard = $event
      }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "item-wrapper"
  }, [_c('d-selector', {
    attrs: {
      "range": _vm.gender,
      "label": "性别",
      "eventid": '2',
      "mpcomid": '2'
    },
    on: {
      "on-change": _vm.handleSexChange
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
    staticClass: "item-wrapper"
  }, [_c('d-input', {
    attrs: {
      "placeholder": "用于游客联系",
      "label": "微信号",
      "eventid": '3',
      "mpcomid": '4'
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
      "placeholder": "用于游客联系",
      "label": "手机号",
      "eventid": '4',
      "mpcomid": '5'
    },
    on: {
      "input": function($event) {
        _vm.form.phone = $event
      }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "item-wrapper"
  }, [_c('d-textarea', {
    attrs: {
      "placeholder": "请简短地介绍下自己",
      "label": "自我介绍",
      "eventid": '5',
      "mpcomid": '6'
    },
    on: {
      "input": function($event) {
        _vm.form.introduction = $event
      }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "item-wrapper"
  }, [_c('button', {
    attrs: {
      "type": "primary",
      "eventid": '6'
    },
    on: {
      "click": _vm.handleSubmit
    }
  }, [_vm._v("\n        确定\n    ")])], 1)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-1b82657d", esExports)
  }
}

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "wrapper"
    }
  }, [(_vm.label !== '') ? _c('div', {
    staticClass: "label"
  }, [_vm._v("\n        " + _vm._s(_vm.label) + "\n    ")]) : _vm._e(), _vm._v(" "), _c('div', {
    attrs: {
      "id": "input-wrapper"
    }
  }, [_c('picker', {
    attrs: {
      "mode": "selector",
      "range": _vm.range,
      "eventid": '0'
    },
    on: {
      "change": _vm.handleChange
    }
  }, [_c('div', {
    staticClass: "info"
  }, [_vm._v(_vm._s(_vm.result))])])], 1)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-d3a5d23a", esExports)
  }
}

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_1b82657d_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(249);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(171)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1b82657d"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_1b82657d_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\guide_sign_up\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1b82657d", Component.options)
  } else {
    hotAPI.reload("data-v-1b82657d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ })

},[101]);
//# sourceMappingURL=main.js.map