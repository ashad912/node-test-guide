"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _webpack = _interopRequireDefault(require("webpack"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _webpackHotMiddleware = _interopRequireDefault(require("webpack-hot-middleware"));

var _webpackDevMiddleware = _interopRequireDefault(require("webpack-dev-middleware"));

var _config = _interopRequireDefault(require("./config"));

var _routes = _interopRequireDefault(require("./routes"));

var _webpack2 = _interopRequireDefault(require("../webpack.config"));

_mongoose["default"].connect(_config["default"].databaseUrl[_config["default"].environment], {
  useNewUrlParser: true
});

var app = new _express["default"]();

if (_config["default"].development) {
  var compiler = (0, _webpack["default"])(_webpack2["default"]);
  app.use((0, _webpackDevMiddleware["default"])(compiler, {
    hot: true,
    publicPath: _webpack2["default"].output.publicPath
  }));
  app.use((0, _webpackHotMiddleware["default"])(compiler));
}

app.use(_express["default"]["static"](_path["default"].resolve(__dirname, 'public')));
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.get('*', function (req, res) {
  return res.sendFile(_path["default"].resolve(__dirname, 'public/index.html'));
});
app.use('/api/v1', _routes["default"]);
var _default = app;
exports["default"] = _default;