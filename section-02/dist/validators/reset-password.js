"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Yup = _interopRequireWildcard(require("yup"));

var _User = _interopRequireDefault(require("../models/User"));

var _PasswordReset = _interopRequireDefault(require("../models/PasswordReset"));

var _validationSchemas = require("../validation-schemas");

/**
 * Validates the login request
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 *
 * @return {Object}
 */
var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, email, token, password, passwordReset, authUser;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, token = _req$body.token, password = _req$body.password;
            _context.prev = 1;
            _context.next = 4;
            return _validationSchemas.ResetPasswordSchema.validate({
              password: password,
              token: token,
              email: email
            });

          case 4:
            _context.next = 6;
            return _PasswordReset["default"].findOne({
              email: email,
              token: token
            });

          case 6:
            passwordReset = _context.sent;

            if (passwordReset) {
              _context.next = 9;
              break;
            }

            throw new Yup.ValidationError('Invalid password reset token.', req.body, 'email');

          case 9:
            _context.next = 11;
            return _User["default"].findOne({
              email: email
            });

          case 11:
            authUser = _context.sent;
            req.authUser = authUser;
            return _context.abrupt("return", next());

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", res.status(422).json({
              message: 'Validation failed.',
              data: {
                errors: (0, _defineProperty2["default"])({}, _context.t0.path, _context.t0.message)
              }
            }));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 16]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;