"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTranslation = useTranslation;

var _i18next = require("i18next");

var _i18nextResourcesToBackend = _interopRequireDefault(require("i18next-resources-to-backend"));

var _initReactI18next = require("react-i18next/initReactI18next");

var _config = require("@/config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var initI18next = function initI18next() {
  var lng,
      ns,
      i18nInstance,
      _args = arguments;
  return regeneratorRuntime.async(function initI18next$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          lng = _args.length > 0 && _args[0] !== undefined ? _args[0] : _config.defaultLocale;
          ns = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'basic';
          i18nInstance = (0, _i18next.createInstance)();
          _context.next = 5;
          return regeneratorRuntime.awrap(i18nInstance.use(_initReactI18next.initReactI18next).use((0, _i18nextResourcesToBackend["default"])(function (language, namespace) {
            return Promise.resolve().then(function () {
              return _interopRequireWildcard(require("./locales/".concat(language, "/").concat(namespace, ".json")));
            });
          })).init({
            // debug: true,
            supportedLngs: _config.locales,
            fallbackLng: _config.defaultLocale,
            lng: lng,
            fallbackNS: 'basic',
            defaultNS: 'basic',
            ns: ns
          }));

        case 5:
          return _context.abrupt("return", i18nInstance);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

function useTranslation(lng, ns) {
  var options,
      i18nextInstance,
      _args2 = arguments;
  return regeneratorRuntime.async(function useTranslation$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
          _context2.next = 3;
          return regeneratorRuntime.awrap(initI18next(lng, ns));

        case 3:
          i18nextInstance = _context2.sent;
          return _context2.abrupt("return", {
            t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
            i18n: i18nextInstance
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}