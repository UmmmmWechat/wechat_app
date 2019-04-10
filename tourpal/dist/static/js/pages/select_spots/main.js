global.webpackJsonp([18],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(77);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
  config: {
    navigationBarTitleText: '选择景点'
  }
});

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_common_DNoMore__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_common_DLoading__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_common_DInput__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_spot__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_const_guideConst__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_const_commonConst__ = __webpack_require__(9);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    DInput: __WEBPACK_IMPORTED_MODULE_2__components_common_DInput__["a" /* default */],
    DNoMore: __WEBPACK_IMPORTED_MODULE_0__components_common_DNoMore__["a" /* default */],
    DLoading: __WEBPACK_IMPORTED_MODULE_1__components_common_DLoading__["a" /* default */]
  },
  data: function data() {
    return {
      spots: [],

      searchWord: '',
      searchValue: undefined, // 用于清空搜索框
      selectedSpots: [],
      loading: false,
      hasMore: true,
      firstSearch: true,

      finishedLoading: false,
      pageName: 'select_spots',

      scrollHeight: 500
    };
  },

  computed: {
    heigthStyle: function heigthStyle() {
      return 'height: ' + this.scrollHeight + 'px';
    }
  },
  mounted: function mounted() {
    this.finishedLoading = false;

    // 初始化数据
    this.firstSearch = true;
    this.spots = [];
    this.selectedSpots = [];
    this.searchWord = '';
    this.hasMore = true;
    this.loading = false;

    this.finishedLoading = true;

    this.refreshFavorSpots();
    this.scrollHeight = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_5__api_const_commonConst__["a" /* WINDOW_HEIGHT */]);
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
    refreshFavorSpots: function refreshFavorSpots() {
      this.dLog('refreshFavorSpots 方法响应');
      this.selectedSpots.splice(0, this.selectedSpots.length); // 清空原 spot 数组

      this.selectedSpots = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_4__api_const_guideConst__["i" /* SELECTED_SPOTS */]);
      if (!this.selectedSpots) {
        this.dLog('没找到 favorSpots');
        this.selectedSpots = [];
      }
    },
    handleScrollToSearch: function handleScrollToSearch(event) {
      var _this = this;

      this.dLog('handleScrollToSearch 方法调用', event);

      if (this.loading) {
        this.dLog('加载中 return');
        return;
      }

      // 加载
      this.hasMore = true;
      this.loading = true;

      // 保留下上次最后的index
      var lastIndex = this.spots.length;

      // 按照关键词搜索景点
      __WEBPACK_IMPORTED_MODULE_3__api_spot__["a" /* default */].querySpotsByKeyword(this.searchWord, lastIndex, function (res) {
        _this.dLog('搜索景点列表成功', res);

        _this.hasMore = res.hasMoreSpot;

        for (var key in res.spotList) {
          _this.spots.push(res.spotList[key]);
        }

        _this.loading = false;
      }, function (fai) {
        _this.showErrorRoast('搜索景点列表失败');

        _this.loading = false;
      });
    },
    handleResetSearch: function handleResetSearch(event) {
      var _this2 = this;

      this.dLog('handleResetSearch 方法调用', event);

      // 非空检查
      if (!this.searchWord) {
        this.showErrorRoast('请输入搜索关键词w');
        return;
      }

      this.hasMore = true;
      this.firstSearch = false;
      this.spots.splice(0, this.spots.length); // 清空搜索的 spot 数组

      // 重新搜索

      // 加载
      this.loading = true;

      // 上滑到顶部
      this.scrollToTop();

      // 按照关键词搜索景点
      __WEBPACK_IMPORTED_MODULE_3__api_spot__["a" /* default */].querySpotsByKeyword(this.searchWord, 0, function (res) {
        _this2.dLog('搜索景点列表成功', res);

        _this2.hasMore = res.hasMoreSpot;

        for (var key in res.spotList) {
          _this2.spots.push(res.spotList[key]);
        }

        _this2.loading = false;
      }, function (fai) {
        _this2.showErrorRoast('搜索景点列表失败', fai);

        _this2.loading = false;
      });
    },
    handleSelectSpot: function handleSelectSpot(spot) {
      this.dLog('handleSelectSpot 方法响应', spot);

      if (this.selectedSpots.findIndex(function (item) {
        return item.id === spot.id;
      }) !== -1) {
        // 已经选过了
        var errMsg = '这个景点已经被你承包啦！';
        this.showErrorRoast(errMsg);
        return;
      }

      this.selectedSpots.push(spot);
      this.spots.splice(this.spots.findIndex(function (item) {
        return item.id === spot.id;
      }), 1);
    },
    handleRemoveSpot: function handleRemoveSpot(spot) {
      this.dLog('handleRemoveSpot 方法响应', spot);

      this.spots.push(spot);
      this.selectedSpots.splice(this.selectedSpots.findIndex(function (item) {
        return item.id === spot.id;
      }), 1);
    },
    handleSubmit: function handleSubmit() {
      var _this3 = this;

      this.dLog('handleSubmit 方法响应');

      if (this.selectedSpots.length === 0) {
        var errMsg = '请至少选择一个景点';
        this.showErrorRoast(errMsg);
        return;
      }

      wx.setStorage({
        key: __WEBPACK_IMPORTED_MODULE_4__api_const_guideConst__["i" /* SELECTED_SPOTS */],
        data: this.selectedSpots,
        success: function success() {
          var sucMsg = '保存景点成功';
          _this3.dLog(sucMsg, _this3.selectedSpots);

          wx.navigateBack();

          // 回滚
          _this3.scrollToTop();
        }
      });
    },
    handleClearSearch: function handleClearSearch(event) {
      var _this4 = this;

      this.dLog('handleClearSearch 方法调用', event);

      // 清空搜索框
      this.searchValue = '';
      setTimeout(function () {
        _this4.searchValue = undefined;
      }, 500);

      // 重置属性
      this.searchWord = '';
      this.firstSearch = true;
      this.hasMore = true;
      this.spots.splice(0, this.spots.length); // 清空搜索的 spot 数组

      // 回滚
      this.scrollToTop();
    },
    scrollToTop: function scrollToTop() {
      var _this5 = this;

      this.dLog('scrollToTop 方法调用');

      this.scrollTop = 0;
      setTimeout(function () {
        _this5.scrollTop = undefined;
      }, 500);

      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    }
  }
});

/***/ }),

/***/ 220:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    attrs: {
      "id": "search"
    }
  }, [_c('icon', {
    attrs: {
      "type": "search",
      "size": "10",
      "color": "black"
    }
  }), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-left": "10rpx",
      "display": "inline-block",
      "width": "90%",
      "color": "black"
    }
  }, [_c('d-input', {
    attrs: {
      "placeholder": "搜索景点",
      "confirm-type": "search",
      "value": _vm.searchValue,
      "eventid": '0',
      "mpcomid": '0'
    },
    on: {
      "input": function($event) {
        _vm.searchWord = $event
      },
      "on-enter": _vm.handleResetSearch
    }
  })], 1)], 1), _vm._v(" "), _c('div', {
    attrs: {
      "id": "selected-list"
    }
  }, _vm._l((_vm.selectedSpots), function(spot, index) {
    return _c('div', {
      key: spot.id,
      staticClass: "selected-item"
    }, [_c('div', {
      staticStyle: {
        "margin-right": "4rpx"
      }
    }, [_vm._v("\n        " + _vm._s(spot.name) + "\n      ")]), _vm._v(" "), _c('div', {
      attrs: {
        "eventid": '1-' + index
      },
      on: {
        "click": function($event) {
          _vm.handleRemoveSpot(spot)
        }
      }
    }, [_c('icon', {
      attrs: {
        "type": "cancel",
        "size": "20",
        "color": "red"
      }
    })], 1)])
  })), _vm._v(" "), _c('div', {
    attrs: {
      "id": "result-list"
    }
  }, [_c('scroll-view', {
    staticClass: "scroll",
    style: (_vm.heightStyle),
    attrs: {
      "scroll-with-animation": "",
      "enable-back-to-top": "",
      "scroll-y": "",
      "scroll-top": _vm.scrollTop,
      "eventid": '3'
    },
    on: {
      "scrolltolower": _vm.handleScrollToSearch
    }
  }, [_c('div', [_vm._l((_vm.spots), function(spot, index) {
    return _c('div', {
      key: spot.id,
      staticClass: "spot-item d-card"
    }, [_c('div', [_c('div', [_vm._v("\n              " + _vm._s(spot.name) + "\n            ")]), _vm._v(" "), _c('div', {
      staticStyle: {
        "color": "gray",
        "font-size": "0.8em"
      }
    }, [_vm._v("\n              " + _vm._s(spot.location.province + '-' + spot.location.city + '-' + spot.location.region) + "\n            ")]), _vm._v(" "), _c('div', {
      staticStyle: {
        "text-align": "right",
        "font-size": "0.8em"
      }
    }, [_c('a', {
      staticClass: "d-a",
      attrs: {
        "eventid": '2-' + index
      },
      on: {
        "click": function($event) {
          _vm.handleSelectSpot(spot)
        }
      }
    }, [_vm._v("\n                  选择\n              ")])])])])
  }), _vm._v(" "), (_vm.finishedLoading) ? _c('div', [_c('d-loading', {
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
      "has-more": !_vm.hasMore || _vm.spots.length || _vm.loading || _vm.firstSearch,
      "mpcomid": '3'
    }
  })], 1) : _vm._e()], 2)])], 1), _vm._v(" "), _c('div', {
    attrs: {
      "id": "btn-div"
    }
  }, [_c('button', {
    staticStyle: {
      "margin": "10rpx"
    },
    attrs: {
      "size": "mini",
      "eventid": '4'
    },
    on: {
      "click": _vm.handleClearSearch
    }
  }, [_vm._v("\n        清空\n    ")]), _vm._v(" "), _c('button', {
    staticStyle: {
      "margin": "10rpx"
    },
    attrs: {
      "size": "mini",
      "type": "primary",
      "eventid": '5'
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
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-ce6d22fe", esExports)
  }
}

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_ce6d22fe_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(278);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(220)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-ce6d22fe"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_ce6d22fe_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\select_spots\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ce6d22fe", Component.options)
  } else {
    hotAPI.reload("data-v-ce6d22fe", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ })

},[103]);
//# sourceMappingURL=main.js.map