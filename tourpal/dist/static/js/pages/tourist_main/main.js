global.webpackJsonp([7],{

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);




var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
    config: {
        navigationBarTitleText: '游伴，有伴'
    }
});

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_spot_SpotCard__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_common_DInput__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_common_DLoading__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_common_DNoMore__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_tourist__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_spot__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_const_touristConst__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__api_mock_tourist_mock_data__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_url__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    SpotCard: __WEBPACK_IMPORTED_MODULE_0__components_spot_SpotCard__["a" /* default */],
    DInput: __WEBPACK_IMPORTED_MODULE_1__components_common_DInput__["a" /* default */],
    DLoading: __WEBPACK_IMPORTED_MODULE_2__components_common_DLoading__["a" /* default */],
    DNoMore: __WEBPACK_IMPORTED_MODULE_3__components_common_DNoMore__["a" /* default */]
  },
  data: function data() {
    return {
      touristId: __WEBPACK_IMPORTED_MODULE_7__api_mock_tourist_mock_data__["a" /* MOCK_TOURIST_ID */],

      location: {
        province: '江苏省',
        city: '南京市',
        region: '栖霞区'
      },

      loading: false,

      hasMore: true,
      spots: [],

      searchHasMore: true,
      isSearch: false,
      searchWord: '',
      searchValue: undefined, // 用于清空搜索框
      searchSpots: [],
      firstSearch: true,

      finishedLoading: false,
      pageName: 'tourist_main',

      scrollTop: undefined,
      searchScrollTop: undefined
    };
  },

  computed: {
    city: function city() {
      var result = '';
      for (var key in this.location) {
        result = result + this.location[key] + '-';
      }
      return result.slice(0, result.length - 1);
    }
  },
  mounted: function mounted() {
    this.finishedLoading = false;

    this.touristId = wx.getStorageSync(__WEBPACK_IMPORTED_MODULE_6__api_const_touristConst__["a" /* TOURIST_ID */]);
    if (!this.touristId) {
      // 未找到游客ID 需要先去登录
      var errMsg = "未找到游客ID 需要先去登录";
      this.dError(errMsg);

      // 输出提示信息
      wx.showToast({
        icon: 'none',
        title: errMsg
      });

      var url = '/' + __WEBPACK_IMPORTED_MODULE_8__pages_url__["c" /* ROLE_SELECT */];
      this.dLog('跳转', url);
      wx.redirectTo({ url: url });

      return;
    }

    this.hasMore = true;
    this.spots.splice(0, this.spots.length); // 清空原 spots 数组

    this.isSearch = false;
    this.firstSearch = true;
    this.searchHasMore = true;
    this.searchWord = '';
    this.searchSpots.splice(0, this.searchSpots.length); // 清空原 searchSpots 数组

    this.finishedLoading = true;

    this.getSpots();
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
    searchScrollToTop: function searchScrollToTop() {
      var _this = this;

      this.dLog("searchScrollToTop 方法调用");

      this.searchScrollTop = 0;
      setTimeout(function () {
        _this.searchScrollTop = undefined;
      }, 500);

      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    },
    scrollToTop: function scrollToTop() {
      var _this2 = this;

      this.dLog("scrollToTop 方法调用");

      this.scrollTop = 0;
      setTimeout(function () {
        _this2.scrollTop = undefined;
      }, 500);

      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    },
    getSpots: function getSpots() {
      var _this3 = this;

      this.dLog("getSpots 方法调用");

      if (this.loading) {
        this.dLog("加载中 return");
        return;
      }

      // 加载
      this.hasMore = true;
      this.loading = true;

      // 保留下上次最后的index
      var lastIndex = this.spots.length;

      // 取得景点列表
      __WEBPACK_IMPORTED_MODULE_5__api_spot__["a" /* default */].querySpots(this.location, lastIndex, function (res) {
        _this3.dLog("取得景点列表成功", res);

        _this3.hasMore = res.hasMoreSpot;

        for (var key in res.spotList) {
          _this3.spots.push(res.spotList[key]);
        }

        _this3.loading = false;
      }, function (err) {
        _this3.showErrorRoast("取得景点列表失败");

        _this3.loading = false;
      });
    },
    handleLocationChange: function handleLocationChange(event) {
      var _this4 = this;

      this.dLog("handleLocationChange 方法调用", event);

      var value = event.target.value;
      var province = value[0];
      var city = value[1];
      var region = value[2];

      if (this.location.province === province && this.location.city === city && this.location.region === region) {
        // 检查是否发生了变动
        this.dLog("所在城市未变动");
        return;
      } else {
        this.dLog("所在城市变动", location);

        var location = {
          province: province,
          city: city,
          region: region
        };

        // 检查该城市是否支持
        __WEBPACK_IMPORTED_MODULE_5__api_spot__["a" /* default */].checkLocationAvailable(location, function (res) {
          _this4.dLog("检查所在城市是否支持成功", res);

          if (res.isAvailable) {
            // 支持该地区
            _this4.location = location;

            if (_this4.isSearch) {
              _this4.handleResetSearch(event);
            } else {
              _this4.resetSpots();

              wx.pageScrollTo({
                scrollTop: 0,
                duration: 300
              });
            }
          } else {
            // 不支持该地区
            _this4.showErrorRoast(res.errMsg);
          }
        }, function (rej) {
          _this4.showErrorRoast("检查所在城市是否支持失败", rej);
        });
      }
    },
    resetSpots: function resetSpots(resolve) {
      var _this5 = this;

      // 初始化景点信息
      this.hasMore = true;
      this.spots.splice(0, this.spots.length); // 清空原 spot 数组

      // 上滑到顶部
      this.scrollTop = 0;
      setTimeout(function () {
        _this5.scrollTop = undefined;
      }, 500);

      // 重新获取景点信息

      // 加载
      this.loading = true;

      // 取得景点列表
      __WEBPACK_IMPORTED_MODULE_5__api_spot__["a" /* default */].querySpots(this.location, 0, function (res) {
        _this5.dLog("取得景点列表成功", res);

        _this5.hasMore = res.hasMoreSpot;

        for (var key in res.spotList) {
          _this5.spots.push(res.spotList[key]);
        }

        _this5.loading = false;

        if (resolve) {
          resolve();
        }
      }, function (err) {
        _this5.showErrorRoast("取得景点列表失败", err);

        _this5.loading = false;
      });
    },
    handleGetMoreSpots: function handleGetMoreSpots(event) {
      this.dLog("handleGetMoreSpots 方法调用", event);
      this.getSpots();
    },
    handleSearchFocus: function handleSearchFocus(event) {
      this.dLog("handleSearchFocus 方法调用", event);
      this.isSearch = true;
    },
    handleSearchInput: function handleSearchInput(e) {
      this.dLog("handleInput 方法调用", e);
      this.searchWord = e;
      this.dLog('message \u66F4\u65B0 ' + this.message);
    },
    handleResetSearch: function handleResetSearch(event) {
      var _this6 = this;

      this.dLog("handleResetSearch 方法调用", event);

      // 非空检查
      if (!this.searchWord) {
        this.showErrorRoast("请输入搜索关键词w");
        return;
      }

      this.searchHasMore = true;
      this.firstSearch = false;
      this.searchSpots.splice(0, this.searchSpots.length); // 清空搜索的 spot 数组

      // 重新搜索

      // 加载
      this.loading = true;

      // 上滑到顶部
      this.searchScrollToTop();

      // 按照关键词搜索景点
      __WEBPACK_IMPORTED_MODULE_5__api_spot__["a" /* default */].querySpotsByKeywordAndCity(this.searchWord, this.location.city, 0, function (res) {
        _this6.dLog("搜索景点列表成功", res);

        _this6.searchHasMore = res.hasMoreSpot;

        for (var key in res.spotList) {
          _this6.searchSpots.push(res.spotList[key]);
        }

        _this6.loading = false;
      }, function (fai) {
        _this6.showErrorRoast("搜索景点列表失败", fai);

        _this6.loading = false;
      });
    },
    handleScrollToSearch: function handleScrollToSearch(event) {
      var _this7 = this;

      this.dLog("handleScrollToSearch 方法调用", event);

      if (this.loading) {
        this.dLog("加载中 return");
        return;
      }

      // 加载
      this.searchHasMore = true;
      this.loading = true;

      // 保留下上次最后的index
      var lastIndex = this.searchSpots.length;

      // 按照关键词搜索景点
      __WEBPACK_IMPORTED_MODULE_5__api_spot__["a" /* default */].querySpotsByKeywordAndCity(this.searchWord, this.location.city, lastIndex, function (res) {
        _this7.dLog("搜索景点列表成功", res);

        _this7.searchHasMore = res.hasMoreSpot;

        for (var key in res.spotList) {
          _this7.searchSpots.push(res.spotList[key]);
        }

        _this7.loading = false;
      }, function (fai) {
        _this7.showErrorRoast("搜索景点列表失败");

        _this7.loading = false;
      });
    },
    handleClickBack: function handleClickBack(event) {
      this.dLog("handleClickBack 方法调用", event);

      // 清空
      this.handleClearSearch(event);

      this.isSearch = false;
    },
    handleClearSearch: function handleClearSearch(event) {
      var _this8 = this;

      this.dLog("handleClearSearch 方法调用", event);

      // 清空搜索框
      this.searchValue = "";
      setTimeout(function () {
        _this8.searchValue = undefined;
      }, 500);

      // 重置属性
      this.searchWord = "";
      this.firstSearch = true;
      this.searchHasMore = true;
      this.searchSpots.splice(0, this.searchSpots.length); // 清空搜索的 spot 数组

      // 回滚
      this.searchScrollToTop();
    },
    handleToPersonCenter: function handleToPersonCenter(event) {
      this.dLog("handleToPersonCenter 方法调用", event);

      var url = '/' + __WEBPACK_IMPORTED_MODULE_8__pages_url__["h" /* TOURIST_CENTER */];
      this.dLog('跳转', url);
      wx.navigateTo({ url: url });
    }
  }
});

/***/ }),

/***/ 161:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 162:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 163:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 164:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 245:
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
      "id": "user-info-div"
    }
  }, [_c('span', [_vm._v("欢迎：")]), _vm._v(" "), _c('span', {
    staticClass: "underline-span"
  }, [_c('span', {
    staticClass: "underline-span",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.handleToPersonCenter
    }
  }, [_c('open-data', {
    attrs: {
      "type": "userNickName",
      "mpcomid": '0'
    }
  })], 1)])]), _vm._v(" "), _c('div', [_c('span', [_vm._v("旅游地点：")]), _vm._v(" "), _c('div', {
    staticStyle: {
      "display": "inline-block"
    }
  }, [_c('picker', {
    attrs: {
      "mode": "region",
      "eventid": '1'
    },
    on: {
      "change": _vm.handleLocationChange
    }
  }, [_c('span', {
    staticClass: "underline-span"
  }, [_vm._v("\r\n        " + _vm._s(_vm.city) + "\r\n        ")])])], 1)]), _vm._v(" "), _c('div', {
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
      "placeholder": "搜索景点",
      "confirm-type": "search",
      "value": _vm.searchValue,
      "eventid": '2',
      "mpcomid": '1'
    },
    on: {
      "input": _vm.handleSearchInput,
      "on-focus": _vm.handleSearchFocus,
      "on-enter": _vm.handleResetSearch
    }
  })], 1)], 1)]), _vm._v(" "), (!_vm.isSearch) ? _c('scroll-view', {
    staticClass: "scroll",
    attrs: {
      "scroll-y": "",
      "scroll-with-animation": "",
      "enable-back-to-top": "",
      "scroll-top": _vm.scrollTop,
      "eventid": '6'
    },
    on: {
      "scrolltolower": _vm.handleGetMoreSpots
    }
  }, [_vm._l((_vm.spots), function(spot, index) {
    return _c('spot-card', {
      key: spot.id,
      attrs: {
        "spot": spot,
        "mpcomid": '2-' + index
      }
    })
  }), _vm._v(" "), (_vm.finishedLoading) ? _c('div', [_c('d-loading', {
    attrs: {
      "loading": _vm.loading,
      "mpcomid": '3'
    }
  }), _vm._v(" "), _c('d-no-more', {
    attrs: {
      "has-more": _vm.hasMore,
      "mpcomid": '4'
    }
  }), _vm._v(" "), _c('d-no-more', {
    attrs: {
      "has-more": !_vm.hasMore || _vm.spots.length || _vm.loading,
      "mpcomid": '5'
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
      "eventid": '3'
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
      "eventid": '4'
    },
    on: {
      "click": _vm.handleClearSearch
    }
  }, [_vm._v("\r\n          清空\r\n        ")])], 1)]), _vm._v(" "), _c('scroll-view', {
    staticClass: "scroll",
    attrs: {
      "scroll-y": "",
      "scroll-with-animation": "",
      "enable-back-to-top": "",
      "scroll-top": _vm.searchScrollTop,
      "eventid": '5'
    },
    on: {
      "scrolltolower": _vm.handleScrollToSearch
    }
  }, [_vm._l((_vm.searchSpots), function(spot, index) {
    return _c('spot-card', {
      key: spot.id,
      attrs: {
        "spot": spot,
        "mpcomid": '6-' + index
      }
    })
  }), _vm._v(" "), (_vm.finishedLoading) ? _c('div', [_c('d-loading', {
    attrs: {
      "loading": _vm.loading,
      "color": 'white',
      "mpcomid": '7'
    }
  }), _vm._v(" "), _c('d-no-more', {
    attrs: {
      "has-more": _vm.searchHasMore,
      "color": 'white',
      "mpcomid": '8'
    }
  }), _vm._v(" "), _c('d-no-more', {
    attrs: {
      "has-more": !_vm.searchHasMore || _vm.searchSpots.length || _vm.loading || _vm.firstSearch,
      "color": 'white',
      "mpcomid": '9'
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
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-0c574479", esExports)
  }
}

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_0c574479_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(245);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(161)
  __webpack_require__(163)
  __webpack_require__(164)
  __webpack_require__(162)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0c574479"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_template_compiler_index_id_data_v_0c574479_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_0_13_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\tourist_main\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0c574479", Component.options)
  } else {
    hotAPI.reload("data-v-0c574479", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ })

},[110]);
//# sourceMappingURL=main.js.map