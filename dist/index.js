"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancellableInstance = exports.post = exports.patch = exports.put = exports.get = exports.createAxiosClient = void 0;

var _axiosCaseConverter = _interopRequireDefault(require("axios-case-converter"));

var _axios = _interopRequireDefault(require("axios"));

var _consts = require("./common/consts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_axios.default.defaults.baseURL = process.env.NODE_ENV === 'test' ? '' : "".concat(_consts.PATH_BASE);
_axios.default.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

var injectInterceptors = function injectInterceptors(client) {
  var interceptors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var response = interceptors.response,
      request = interceptors.request;

  var newClient = _objectSpread({}, client);

  if (response) {
    client.interceptors.response.use(response);
  }

  if (request) {
    client.interceptors.request.use(request);
  }

  return newClient;
};

var axiosHandleUnAuthRequests = function axiosHandleUnAuthRequests(client) {
  client.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    var unAuthorizedResponses = [401, 403];
    var _error$response = error.response;
    _error$response = _error$response === void 0 ? {} : _error$response;
    var status = _error$response.status;

    if (unAuthorizedResponses.includes(status)) {
      window.location.reload();
    }

    return Promise.reject(error);
  });
  return client;
};

var createAxiosClient = function createAxiosClient() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var convertCase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var axiosInstance = _axios.default.create(settings.config); // Converter switches between snakeCase and camelCase


  var client = convertCase ? (0, _axiosCaseConverter.default)(axiosInstance) : axiosInstance;
  injectInterceptors(client, settings.interceptors);
  axiosHandleUnAuthRequests(client);
  return client;
};

exports.createAxiosClient = createAxiosClient;

var get = function get(_ref) {
  var url = _ref.url,
      params = _ref.params,
      cancelToken = _ref.cancelToken,
      client = _ref.client;
  return client.get(url, {
    cancelToken: cancelToken,
    params: params
  });
};

exports.get = get;

var put = function put(_ref2) {
  var url = _ref2.url,
      data = _ref2.data,
      client = _ref2.client;
  return client.put(url, data);
};

exports.put = put;

var patch = function patch(_ref3) {
  var url = _ref3.url,
      data = _ref3.data,
      client = _ref3.client;
  return client.patch(url, data);
};

exports.patch = patch;

var post = function post(_ref4) {
  var url = _ref4.url,
      data = _ref4.data,
      client = _ref4.client;
  return client.post(url, data);
};

exports.post = post;

var cancellableInstance = function cancellableInstance() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Replaced';
  // Mutable - must be changed with each request
  var call = null;
  return function () {
    if (call) {
      call.cancel(msg);
    } // Mutate the last call


    call = _axios.default.CancelToken.source();
    return call;
  };
};

exports.cancellableInstance = cancellableInstance;