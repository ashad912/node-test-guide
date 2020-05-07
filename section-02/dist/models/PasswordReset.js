"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PasswordResetSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var PasswordResetSchema = new _mongoose["default"].Schema({
  email: String,
  token: String,
  createdAt: Date
});
exports.PasswordResetSchema = PasswordResetSchema;

var _default = _mongoose["default"].model('PasswordReset', PasswordResetSchema);

exports["default"] = _default;