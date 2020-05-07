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
 *
 * @param {Object} res
 *
 * @param {Function} next
 *
 * @return {Object}
 */
var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var email, existingUser, existingPasswordReset;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = req.body.email;
            _context.prev = 1;
            _context.next = 4;
            return _validationSchemas.ForgotPasswordSchema.validate({
              email: email
            });

          case 4:
            _context.next = 6;
            return _User["default"].findOne({
              email: email
            });

          case 6:
            existingUser = _context.sent;

            if (existingUser) {
              _context.next = 9;
              break;
            }

            throw new Yup.ValidationError('No account was found with this email.', req.body, 'email');

          case 9:
            _context.next = 11;
            return _PasswordReset["default"].findOne({
              email: email
            });

          case 11:
            existingPasswordReset = _context.sent;

            if (!existingPasswordReset) {
              _context.next = 14;
              break;
            }

            throw new Yup.ValidationError('Password reset link already sent.', req.body, 'email');

          case 14:
            req.authUser = existingUser;
            return _context.abrupt("return", next());

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", res.status(422).json({
              message: 'Validation failed.',
              data: {
                errors: (0, _defineProperty2["default"])({}, _context.t0.path, _context.t0.message)
              }
            }));

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 18]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;