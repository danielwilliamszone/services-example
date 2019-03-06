"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.client = void 0;

var _ = require("../../../../");

var client = (0, _.createAxiosClient)();
exports.client = client;
var baseUrl = '/api/codessearch/ethnicity';

var getEthnicityCodes = function getEthnicityCodes() {
  return (0, _.get)({
    url: baseUrl,
    client: client
  }).then(function (_ref) {
    var data = _ref.data;
    return data.hits;
  }).catch(function (error) {
    return Promise.reject(error);
  });
};

var _default = getEthnicityCodes;
exports.default = _default;