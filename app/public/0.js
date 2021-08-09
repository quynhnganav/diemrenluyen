(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./resources/js/pages/react/index.js":
/*!*******************************************!*\
  !*** ./resources/js/pages/react/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_es_modal_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/es/modal/style/css */ "./node_modules/antd/es/modal/style/css.js");
/* harmony import */ var antd_es_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/es/modal */ "./node_modules/antd/es/modal/index.js");
/* harmony import */ var antd_es_button_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd/es/button/style/css */ "./node_modules/antd/es/button/style/css.js");
/* harmony import */ var antd_es_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd/es/button */ "./node_modules/antd/es/button/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);





function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var ReactPage = function ReactPage() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var showModal = function showModal() {
    setVisible(true);
  };

  var handleCancel = function handleCancel() {
    setVisible(false);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd_es_button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: "primary",
    onClick: showModal
  }, "Open Modal with async logic React"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd_es_modal__WEBPACK_IMPORTED_MODULE_1__["default"], {
    title: "Title",
    visible: visible,
    onOk: handleCancel,
    onCancel: handleCancel
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("p", null, "ModalText")));
};

/* harmony default export */ __webpack_exports__["default"] = (ReactPage);

/***/ })

}]);