(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.react-resize-detector"],{

/***/ "MdjF":
/*!*****************************************************************************!*\
  !*** ./node_modules/react-resize-detector/lib/components/ResizeDetector.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"q1tI\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"17x9\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _resizeObserverPolyfill = __webpack_require__(/*! resize-observer-polyfill */ \"bdgK\");\n\nvar _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);\n\nvar _lodash = __webpack_require__(/*! lodash.debounce */ \"9/5/\");\n\nvar _lodash2 = _interopRequireDefault(_lodash);\n\nvar _lodash3 = __webpack_require__(/*! lodash.throttle */ \"hKI/\");\n\nvar _lodash4 = _interopRequireDefault(_lodash3);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar listMode = { debounce: _lodash2.default, throttle: _lodash4.default };\n\nvar styles = {\n  position: 'absolute',\n  width: 0,\n  height: 0,\n  visibility: 'hidden',\n  display: 'none'\n};\n\nvar ResizeDetector = function (_PureComponent) {\n  _inherits(ResizeDetector, _PureComponent);\n\n  function ResizeDetector(props) {\n    _classCallCheck(this, ResizeDetector);\n\n    var _this = _possibleConstructorReturn(this, (ResizeDetector.__proto__ || Object.getPrototypeOf(ResizeDetector)).call(this, props));\n\n    _this.createResizeObserver = function (entries) {\n      var _this$props = _this.props,\n          handleWidth = _this$props.handleWidth,\n          handleHeight = _this$props.handleHeight,\n          onResize = _this$props.onResize;\n\n      entries.forEach(function (entry) {\n        var _entry$contentRect = entry.contentRect,\n            width = _entry$contentRect.width,\n            height = _entry$contentRect.height;\n\n        var notifyWidth = handleWidth && _this.width !== width;\n        var notifyHeight = handleHeight && _this.height !== height;\n        if (!_this.skipOnMount && (notifyWidth || notifyHeight)) {\n          onResize(width, height);\n        }\n        _this.width = width;\n        _this.height = height;\n        _this.skipOnMount = false;\n      });\n    };\n\n    var skipOnMount = props.skipOnMount,\n        refreshMode = props.refreshMode,\n        refreshRate = props.refreshRate;\n\n\n    _this.width = undefined;\n    _this.height = undefined;\n    _this.skipOnMount = skipOnMount;\n\n    var resizeObserver = listMode[refreshMode] && listMode[refreshMode](_this.createResizeObserver, refreshRate) || _this.createResizeObserver;\n\n    _this.ro = new _resizeObserverPolyfill2.default(resizeObserver);\n    return _this;\n  }\n\n  _createClass(ResizeDetector, [{\n    key: 'componentDidMount',\n    value: function componentDidMount() {\n      var resizableElementId = this.props.resizableElementId;\n\n      var resizableElement = resizableElementId ? document.getElementById(resizableElementId) : this.el.parentElement;\n      this.ro.observe(resizableElement);\n    }\n  }, {\n    key: 'componentWillUnmount',\n    value: function componentWillUnmount() {\n      var resizableElementId = this.props.resizableElementId;\n\n      var resizableElement = resizableElementId ? document.getElementById(resizableElementId) : this.el.parentElement;\n      this.ro.unobserve(resizableElement);\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var _this2 = this;\n\n      return _react2.default.createElement('div', {\n        style: styles,\n        ref: function ref(el) {\n          _this2.el = el;\n        }\n      });\n    }\n  }]);\n\n  return ResizeDetector;\n}(_react.PureComponent);\n\nexports.default = ResizeDetector;\n\n\nResizeDetector.propTypes = {\n  handleWidth: _propTypes2.default.bool,\n  handleHeight: _propTypes2.default.bool,\n  skipOnMount: _propTypes2.default.bool,\n  refreshRate: _propTypes2.default.number,\n  refreshMode: _propTypes2.default.string,\n  resizableElementId: _propTypes2.default.string,\n  onResize: _propTypes2.default.func\n};\n\nResizeDetector.defaultProps = {\n  handleWidth: false,\n  handleHeight: false,\n  skipOnMount: false,\n  refreshRate: 1000,\n  refreshMode: undefined,\n  resizableElementId: '',\n  onResize: function onResize(e) {\n    return e;\n  }\n};\n\n//# sourceURL=webpack:///./node_modules/react-resize-detector/lib/components/ResizeDetector.js?");

/***/ }),

/***/ "mdaS":
/*!*********************************************************!*\
  !*** ./node_modules/react-resize-detector/lib/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _ResizeDetector = __webpack_require__(/*! ./components/ResizeDetector */ \"MdjF\");\n\nvar _ResizeDetector2 = _interopRequireDefault(_ResizeDetector);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _ResizeDetector2.default;\n\n//# sourceURL=webpack:///./node_modules/react-resize-detector/lib/index.js?");

/***/ })

}]);