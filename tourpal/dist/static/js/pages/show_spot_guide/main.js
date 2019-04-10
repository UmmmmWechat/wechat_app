global.webpackJsonp([8],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(79);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
  config: {
    navigationBarTitleText: '向导'
  }
});

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_tourist__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_guide_GuideProfileCard__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_common_DLoading__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_common_DInput__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_common_DNoMore__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_const_spotConst__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_const_commonConst__ = __webpack_require__(9);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//











var SHOW_TOP_SCROLLTOP = 700;

/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    GuideProfileCard: __WEBPACK_IMPORTED_MODULE_1__components_guide_GuideProfileCard__["a" /* default */],
    DLoading: __WEBPACK_IMPORTED_MODULE_2__components_common_DLoading__["a" /* default */],
    DInput: __WEBPACK_IMPORTED_MODULE_3__components_common_DInput__["a" /* default */],
    DNoMore: __WEBPACK_IMPORTED_MODULE_4__components_common_DNoMore__["a" /* default */]
  },
  data: function data() {
    return {
      spotName: 'spotName',
      spotID: 'spotID',

      loading: false,

      hasMore: true,
      guides: [],

      isSearch: false,
      searchHasMore: true,
      searchWord: '',
      searchValue: undefined, // 用于清空搜索框
      searchGuides: [],
      firstSearch: true,

      finishedLoading: false,
      pageName: 'show_spot_guide',

      scrollTop: undefined,
      searchScrollTop: undefined,
      // 滑动高度
      scrollHeight: 500
    };
  },
  mounted: function mounted() {
    this.finishedLoading = false;
    // 取得景点ID
    this.spotID = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_5__api_const_spotConst__["a" /* D_SPOT_ID */]);
    if (!this.spotID) {
      wx.navigateBack();
      var errMsg = "取得景点ID失败";
      this.showErrorRoast(errMsg, fai);
      return;
    }
    this.dLog("取得景点ID完成");

    // 取得景点名称
    this.spotName = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_5__api_const_spotConst__["b" /* D_SPOT_NAME */]);
    if (!this.spotName) {
      wx.navigateBack();
      var _errMsg = "取得景点名称失败";
      this.showErrorRoast(_errMsg, fai);
      return;
    }
    this.dLog("取得景点名称完成");

    // 初始化数据
    this.hasMore = true;
    this.guides.splice(0, this.guides.length); // 清空原 guides 数组

    this.isSearch = false;
    this.firstSearch = true;
    this.searchHasMore = true;
    this.searchWord = '';
    this.searchGuides.splice(0, this.searchGuides.length); // 清空原 searchGuides 数组

    // 屏幕高度
    this.scrollHeight = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_6__api_const_commonConst__["a" /* WINDOW_HEIGHT */]);

    this.finishedLoading = true;

    this.getGuides();
  },

  computed: {
    heigthStyle: function heigthStyle() {
      return 'height: ' + this.scrollHeight + 'px';
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
    scrollToTop: function scrollToTop() {
      var _this = this;

      this.dLog('scrollToTop 方法调用');

      if (this.isSearch) {
        this.searchScrollTop = 0;
        setTimeout(function () {
          _this.searchScrollTop = undefined;
        }, 500);
      } else {
        this.scrollTop = 0;
        setTimeout(function () {
          _this.scrollTop = undefined;
        }, 500);
      }

      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    },
    getGuides: function getGuides() {
      var _this2 = this;

      this.dLog('getGuides 方法调用');

      if (this.loading) {
        this.dLog('加载中 return');
        return;
      }

      // 加载
      this.hasMore = true;
      this.loading = true;

      // 保留下上次最后的index
      var lastIndex = this.guides.length;

      // 取得导游列表
      __WEBPACK_IMPORTED_MODULE_0__api_tourist__["a" /* default */].queryGuideBySpot(this.spotID, lastIndex, function (res) {
        _this2.dLog('通过景点取得导游列表成功', res);

        _this2.hasMore = res.hasMoreGuide;

        for (var key in res.guideList) {
          _this2.guides.push(res.guideList[key]);
        }
        _this2.loading = false;
      }, function (rej) {
        _this2.showErrorRoast('通过景点取得导游列表失败', rej);
        _this2.loading = false;
      });
    },
    handleSearchFocus: function handleSearchFocus(event) {
      this.dLog('handleSearchFocus 方法调用', event);
      this.isSearch = true;
    },
    handleSearchInput: function handleSearchInput(e) {
      this.dLog('handleInput 方法调用', e);
      this.searchWord = e;
      this.dLog('message \u66F4\u65B0 ' + this.message);
    },
    handleResetSearch: function handleResetSearch(event) {
      var _this3 = this;

      this.dLog('handleResetSearch 方法调用', event);

      // 非空检查
      if (!this.searchWord) {
        this.showErrorRoast('请输入搜索关键词w');
        return;
      }

      this.searchHasMore = true;
      this.firstSearch = false;
      this.searchGuides.splice(0, this.searchGuides.length); // 清空搜索的 spot 数组

      // 重新搜索

      // 加载
      this.loading = true;

      // 上滑到顶部
      this.scrollToTop();

      // 按照关键词搜索向导
      __WEBPACK_IMPORTED_MODULE_0__api_tourist__["a" /* default */].queryGuideByKeyword(this.searchWord, 0, function (res) {
        _this3.dLog('搜索向导列表成功', res);

        _this3.searchHasMore = res.hasMoreGuide;

        for (var key in res.guideList) {
          _this3.searchGuides.push(res.guideList[key]);
        }

        _this3.loading = false;
      }, function (fai) {
        _this3.showErrorRoast('搜索向导列表失败');

        _this3.loading = false;
      });
    },
    handleScrollToSearch: function handleScrollToSearch(event) {
      var _this4 = this;

      this.dLog('handleScrollToSearch 方法调用', event);

      if (this.loading) {
        this.dLog('加载中 return');
        return;
      }

      // 加载
      this.searchHasMore = true;
      this.loading = true;

      // 保留下上次最后的index
      var lastIndex = this.searchGuides.length;

      // 按照关键词搜索向导
      __WEBPACK_IMPORTED_MODULE_0__api_tourist__["a" /* default */].queryGuideByKeyword(this.searchWord, lastIndex, function (res) {
        _this4.dLog('通过关键词搜索导游列表成功', res);

        _this4.searchHasMore = res.hasMoreGuide;

        for (var key in res.guideList) {
          _this4.searchGuides.push(res.guideList[key]);
        }

        _this4.loading = false;
      }, function (rej) {
        _this4.showErrorRoast('通过关键词搜索导游列表失败', rej);

        _this4.loading = false;
      });
    },
    handleClickBack: function handleClickBack(event) {
      this.dLog('handleClickBack 方法调用', event);

      // 清空
      this.handleClearSearch(event);

      this.isSearch = false;
    },
    handleClearSearch: function handleClearSearch(event) {
      var _this5 = this;

      this.dLog('handleClearSearch 方法调用', event);

      // 清空搜索框
      this.searchValue = '';
      setTimeout(function () {
        _this5.searchValue = undefined;
      }, 500);

      // 重置属性
      this.searchWord = '';
      this.firstSearch = true;
      this.searchHasMore = true;
      this.searchGuides.splice(0, this.searchGuides.length); // 清空搜索的 spot 数组

      // 回滚
      this.scrollToTop();
    }
  }
});

/***/ }),

/***/ 199:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 200:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 201:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 202:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "d-head",
    attrs: {
      "id": "head"
    }
  }, [_c('div', {
    attrs: {
      "id": "title"
    }
  }, [_vm._v(_vm._s(_vm.spotName))]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "search"
    }
  }, [_c('icon', {
    attrs: {
      "type": "search",
      "size": "10",
      "color": "white"
    }
  }), _vm._v(" "), _c('div', {
    staticStyle: {
      "display": "inline-block",
      "width": "90%"
    }
  }, [_c('d-input', {
    attrs: {
      "placeholder": "搜索向导",
      "confirm-type": "search",
      "value": _vm.searchValue,
      "eventid": '0',
      "mpcomid": '0'
    },
    on: {
      "input": _vm.handleSearchInput,
      "on-focus": _vm.handleSearchFocus,
      "on-enter": _vm.handleResetSearch
    }
  })], 1)], 1)]), _vm._v(" "), (!_vm.isSearch) ? _c('scroll-view', {
    staticClass: "scroll",
    attrs: {
      "scroll-top": _vm.scrollTop,
      "scroll-y": "",
      "enable-back-to-top": "",
      "scroll-with-animation": "",
      "eventid": '4'
    },
    on: {
      "scrolltolower": _vm.getGuides
    }
  }, [_vm._l((_vm.guides), function(guide, index) {
    return _c('guide-profile-card', {
      key: guide.id,
      attrs: {
        "guide": guide,
        "mpcomid": '1-' + index
      }
    })
  }), _vm._v(" "), (_vm.finishedLoading) ? _c('div', [_c('d-loading', {
    attrs: {
      "loading": _vm.loading,
      "mpcomid": '2'
    }
  }), _vm._v(" "), _c('d-no-more', {
    attrs: {
      "has-more": _vm.hasMore,
      "mpcomid": '3'
    }
  }), _vm._v(" "), _c('d-no-more', {
    attrs: {
      "has-more": !_vm.hasMore || _vm.guides.length || _vm.loading,
      "mpcomid": '4'
    }
  })], 1) : _vm._e()], 2) : _c('section', {
    staticClass: "d-search-list"
  }, [_c('header', [_c('div', {
    staticStyle: {
      "text-align": "center",
      "padding": "10rpx"
    }
  }, [_c('button', {
    staticClass: "d-back-btn-white",
    attrs: {
      "size": "mini",
      "plain": "",
      "eventid": '1'
    },
    on: {
      "click": _vm.handleClickBack
    }
  }, [_vm._v("\r\n          返回\r\n        ")]), _vm._v(" "), _c('button', {
    staticClass: "d-back-btn-white",
    staticStyle: {
      "margin-left": "33rpx"
    },
    attrs: {
      "size": "mini",
      "plain": "",
      "eventid": '2'
    },
    on: {
      "click": _vm.handleClearSearch
    }
  }, [_vm._v("\r\n          清空\r\n        ")])], 1)]), _vm._v(" "), _c('scroll-view', {
    staticClass: "scroll",
    style: (_vm.heigthStyle),
    attrs: {
      "scroll-y": "",
      "scroll-with-animation": "",
      "enable-back-to-top": "",
      "scroll-top": _vm.searchScrollTop,
      "eventid": '3'
    },
    on: {
      "scrolltolower": _vm.handleScrollToSearch
    }
  }, [_vm._l((_vm.searchGuides), function(guide, index) {
    return _c('guide-profile-card', {
      key: guide.id,
      attrs: {
        "color": 'white',
        "guide": guide,
        "mpcomid": '5-' + index
      }
    })
  }), _vm._v(" "), (_vm.finishedLoading) ? _c('div', [_c('d-loading', {
    attrs: {
      "loading": _vm.loading,
      "color": 'white',
      "mpcomid": '6'
    }
  }), _vm._v(" "), _c('d-no-more', {
    attrs: {
      "has-more": _vm.searchHasMore,
      "color": 'white',
      "mpcomid": '7'
    }
  }), _vm._v(" "), _c('d-no-more', {
    attrs: {
      "has-more": !_vm.searchHasMore || _vm.searchGuides.length || _vm.loading || _vm.firstSearch,
      "color": 'white',
      "mpcomid": '8'
    }
  })], 1) : _vm._e()], 2)], 1)], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-7bd6d0a4", esExports)
  }
}

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_7bd6d0a4_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(267);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(199)
  __webpack_require__(201)
  __webpack_require__(202)
  __webpack_require__(200)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7bd6d0a4"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_7bd6d0a4_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\show_spot_guide\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7bd6d0a4", Component.options)
  } else {
    hotAPI.reload("data-v-7bd6d0a4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ })

},[105]);
//# sourceMappingURL=main.js.map