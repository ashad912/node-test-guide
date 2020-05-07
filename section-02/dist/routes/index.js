"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("./v1/auth"));

var v1Router = new _express.Router();
v1Router.use('/auth', _auth["default"]);
var _default = v1Router;
exports["default"] = _default;