"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = _interopRequireDefault(require("../config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User"));

/**
 * Authenticate the user jwt.
 * Sets the authenticated user on request
 *
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 *
 * @return {Function}
 */
var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, payload, authUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = req.body.access_token || req.headers['access_token'] || req.query.access_token;
            payload = _jsonwebtoken["default"].verify(token, _config["default"].jwtSecret);
            _context.next = 5;
            return _User["default"].findById(payload.id);

          case 5:
            authUser = _context.sent;
            req.authUser = authUser;
            return _context.abrupt("return", next());

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(401).json({
              message: 'Unauthenticated.'
            }));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;