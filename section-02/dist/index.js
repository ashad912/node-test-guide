"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chalk = _interopRequireDefault(require("chalk"));

var _config = _interopRequireDefault(require("./config"));

var _app = _interopRequireDefault(require("./app"));

_app["default"].listen(_config["default"].port, function () {
  console.log("\n        ".concat(_chalk["default"].blue("\uD83D\uDC9A   Project running on http://localhost:".concat(_config["default"].port)), "\n  "));
});