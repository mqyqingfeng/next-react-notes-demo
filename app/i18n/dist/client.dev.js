"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTranslation = useTranslation;
exports.cookieName = void 0;

var _react = require("react");

var _i18next = _interopRequireDefault(require("i18next"));

var _reactI18next = require("react-i18next");

var _reactCookie = require("react-cookie");

var _i18nextResourcesToBackend = _interopRequireDefault(require("i18next-resources-to-backend"));

var _i18nextBrowserLanguagedetector = _interopRequireDefault(require("i18next-browser-languagedetector"));

var _config = require("@/config.js");

var _i18next$use$use$use$;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var cookieName = 'i18next';
exports.cookieName = cookieName;
var runsOnServerSide = typeof window === 'undefined';

_i18next["default"].use(_reactI18next.initReactI18next).use(_i18nextBrowserLanguagedetector["default"]).use((0, _i18nextResourcesToBackend["default"])(function (language, namespace) {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("./locales/".concat(language, "/").concat(namespace, ".json")));
  });
})).init((_i18next$use$use$use$ = {
  supportedLngs: _config.locales,
  fallbackLng: _config.defaultLocale,
  lng: _config.defaultLocale,
  fallbackNS: 'basic',
  defaultNS: 'basic',
  ns: 'basic'
}, _defineProperty(_i18next$use$use$use$, "lng", undefined), _defineProperty(_i18next$use$use$use$, "detection", {
  order: ['path', 'htmlTag', 'cookie', 'navigator']
}), _defineProperty(_i18next$use$use$use$, "preload", runsOnServerSide ? _config.locales : []), _i18next$use$use$use$));

function useTranslation(lng, ns, options) {
  var _useCookies = (0, _reactCookie.useCookies)([cookieName]),
      _useCookies2 = _slicedToArray(_useCookies, 2),
      cookies = _useCookies2[0],
      setCookie = _useCookies2[1];

  var ret = (0, _reactI18next.useTranslation)(ns, options);
  var i18n = ret.i18n;

  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  } else {
    var _useState = (0, _react.useState)(i18n.resolvedLanguage),
        _useState2 = _slicedToArray(_useState, 2),
        activeLng = _useState2[0],
        setActiveLng = _useState2[1];

    (0, _react.useEffect)(function () {
      if (activeLng === i18n.resolvedLanguage) return;
      setActiveLng(i18n.resolvedLanguage);
    }, [activeLng, i18n.resolvedLanguage]);
    (0, _react.useEffect)(function () {
      if (!lng || i18n.resolvedLanguage === lng) return;
      i18n.changeLanguage(lng);
    }, [lng, i18n]);
    (0, _react.useEffect)(function () {
      if (cookies.i18next === lng) return;
      setCookie(cookieName, lng, {
        path: '/'
      });
    }, [lng, cookies.i18next]);
  }

  return ret;
}