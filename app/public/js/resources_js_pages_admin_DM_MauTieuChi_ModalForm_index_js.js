"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_admin_DM_MauTieuChi_ModalForm_index_js"],{

/***/ "./resources/js/config/axios.js":
/*!**************************************!*\
  !*** ./resources/js/config/axios.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "axios": () => (/* binding */ axios)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

var axios = axios__WEBPACK_IMPORTED_MODULE_0___default().create({
  baseURL: '/' // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}

});


/***/ }),

/***/ "./resources/js/config/index.js":
/*!**************************************!*\
  !*** ./resources/js/config/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "axios": () => (/* reexport safe */ _axios__WEBPACK_IMPORTED_MODULE_0__.axios)
/* harmony export */ });
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./axios */ "./resources/js/config/axios.js");


/***/ }),

/***/ "./resources/js/pages/admin/DM_MauTieuChi/ModalForm/index.js":
/*!*******************************************************************!*\
  !*** ./resources/js/pages/admin/DM_MauTieuChi/ModalForm/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var antd_es_input_number__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! antd/es/input-number */ "./node_modules/antd/es/input-number/index.js");
/* harmony import */ var antd_es_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! antd/es/form */ "./node_modules/antd/es/form/index.js");
/* harmony import */ var antd_es_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! antd/es/input */ "./node_modules/antd/es/input/index.js");
/* harmony import */ var antd_es_notification__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd/es/notification */ "./node_modules/antd/es/notification/index.js");
/* harmony import */ var antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd/lib/form/Form */ "./node_modules/antd/lib/form/Form.js");
/* harmony import */ var antd_lib_modal_Modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd/lib/modal/Modal */ "./node_modules/antd/lib/modal/Modal.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../config */ "./resources/js/config/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var ModalForm = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (_ref, ref) {
  var callback = _ref.callback;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      item = _useState6[0],
      setItem = _useState6[1];

  var _useForm = (0,antd_lib_form_Form__WEBPACK_IMPORTED_MODULE_3__.useForm)(),
      _useForm2 = _slicedToArray(_useForm, 1),
      form = _useForm2[0];

  var showModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (itemInput) {
    if (itemInput) {
      setItem(itemInput);
      form === null || form === void 0 ? void 0 : form.setFieldsValue(_objectSpread({}, itemInput));
    } else form === null || form === void 0 ? void 0 : form.setFieldsValue({
      TongSoDiem: 100
    });

    setVisible(true);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref, function () {
    return {
      showModal: showModal
    };
  });
  var hiddenModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setVisible(false);
    setItem(null);
    form === null || form === void 0 ? void 0 : form.resetFields();
  }, []);
  var onFinish = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (values) {
    console.log(values);

    if (values !== null && values !== void 0 && values.TongSoDiem && (values === null || values === void 0 ? void 0 : values.TongSoDiem) < 0) {
      form === null || form === void 0 ? void 0 : form.setFields([{
        name: 'TongSoDiem',
        errors: ["Tổng số điểm phải lớn hơn 0"]
      }]);
      return;
    }

    setLoading(true);

    if (item) {
      _config__WEBPACK_IMPORTED_MODULE_1__.axios.put("/admin/DM_MauTieuChi/".concat(item === null || item === void 0 ? void 0 : item.id), _objectSpread(_objectSpread({}, values), {}, {
        PhatHanh: false
      })).then(function (res) {
        console.log(res);

        antd_es_notification__WEBPACK_IMPORTED_MODULE_4__.default.success({
          message: 'Chỉnh sửa thành công'
        });

        callback && callback();
        hiddenModal();
      })["catch"](function (err) {
        console.log(err);

        antd_es_notification__WEBPACK_IMPORTED_MODULE_4__.default.error({
          message: 'Lỗi khi chỉnh sửa'
        });
      })["finally"](function () {
        return setLoading(false);
      });
    } else _config__WEBPACK_IMPORTED_MODULE_1__.axios.post('/admin/DM_MauTieuChi', _objectSpread({}, values)).then(function (res) {
      console.log(res);

      antd_es_notification__WEBPACK_IMPORTED_MODULE_4__.default.success({
        message: 'Thêm mới thành công'
      });

      callback && callback();
      hiddenModal();
    })["catch"](function (err) {
      console.log(err);

      antd_es_notification__WEBPACK_IMPORTED_MODULE_4__.default.error({
        message: 'Lỗi khi thêm mới'
      });
    })["finally"](function () {
      return setLoading(false);
    });
  }, [item]);
  var onSubmit = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (values) {
    form === null || form === void 0 ? void 0 : form.submit();
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(antd_lib_modal_Modal__WEBPACK_IMPORTED_MODULE_5__.default, {
    visible: visible,
    onCancel: hiddenModal,
    onOk: onSubmit,
    okButtonProps: {
      loading: loading
    },
    centered: true,
    title: (item === null || item === void 0 ? void 0 : item.TenMauTieuChi) || 'Thêm mới mẫu tiêu chí',
    okText: item ? 'Cập nhật' : 'Thêm mới',
    cancelText: "H\u1EE7y",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(antd_es_form__WEBPACK_IMPORTED_MODULE_6__.default, {
      layout: "vertical",
      wrapperCol: {
        span: 24
      },
      labelCol: {
        span: 24
      },
      onFinish: onFinish,
      form: form,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(antd_es_form__WEBPACK_IMPORTED_MODULE_6__.default.Item, {
        label: "T\xEAn m\u1EABu ti\xEAu ch\xED",
        name: "TenMauTieuChi",
        rules: [{
          required: true,
          message: 'Nhập tên mẫu tiêu chí'
        }],
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(antd_es_input__WEBPACK_IMPORTED_MODULE_7__.default, {})
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(antd_es_form__WEBPACK_IMPORTED_MODULE_6__.default.Item, {
        label: "T\u1ED5ng s\u1ED1 \u0111i\u1EC3m",
        name: "TongSoDiem",
        rules: [{
          required: true,
          message: 'Nhập tổng số điểm'
        }],
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(antd_es_input_number__WEBPACK_IMPORTED_MODULE_8__.default, {})
      })]
    })
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(ModalForm));

/***/ })

}]);