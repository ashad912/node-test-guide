"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _User = _interopRequireDefault(require("../models/User"));

var _PasswordReset = _interopRequireDefault(require("../models/PasswordReset"));

/**
 * Handle user login endpoint
 *
 * @param {Object} req
 * @param {Object} res
 */
var login = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, email, password, failureResponse, user, passwordIsCorrect, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;

            failureResponse = function failureResponse() {
              return res.status(401).json({
                data: {
                  errors: {
                    email: 'These credentials do not match our records.'
                  }
                },
                message: 'These credentials do not match our records.'
              });
            };

            _context.next = 4;
            return _User["default"].findOne({
              email: email
            });

          case 4:
            user = _context.sent;

            if (user) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", failureResponse());

          case 7:
            passwordIsCorrect = user.comparePasswords(password);

            if (passwordIsCorrect) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", failureResponse());

          case 10:
            _context.next = 12;
            return user.generateToken();

          case 12:
            token = _context.sent;
            return _context.abrupt("return", res.json({
              data: {
                user: user,
                token: token
              },
              message: 'Login successful.'
            }));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Handle user registration endpoint
 *
 * @param {Object} req
 * @param {Object} res
 *
 * @return
 */


var register = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, name, email, password, user, token;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, password = _req$body2.password;
            _context2.next = 3;
            return _User["default"].create({
              name: name,
              email: email,
              password: password
            });

          case 3:
            user = _context2.sent;
            token = user.generateToken();
            return _context2.abrupt("return", res.json({
              data: {
                user: user,
                token: token
              },
              message: 'Account registered.'
            }));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function register(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Request password reset for a user
 *
 * @param {Object} req
 * @param {Object} res
 * @return
 */


var forgotPassword = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return req.authUser.forgotPassword();

          case 2:
            return _context3.abrupt("return", res.json({
              message: 'Forgot password email sent.'
            }));

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function forgotPassword(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Reset user's password
 *
 * @param {Object} req
 * @param {Object} res
 * @return
 */


var resetPassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var password;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            password = req.body.password;
            _context4.next = 3;
            return _User["default"].findOneAndUpdate({
              email: req.authUser.email
            }, {
              password: _bcryptjs["default"].hashSync(password)
            });

          case 3:
            _context4.next = 5;
            return _PasswordReset["default"].findOneAndDelete({
              email: req.authUser.email
            });

          case 5:
            return _context4.abrupt("return", res.json({
              message: 'Password has been reset.'
            }));

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function resetPassword(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Resend email confirmation email
 *
 * @param {Object} req
 * @param {Object} res
 */


var resendEmailConfirm = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (req.authUser.emailConfirmedAt) {
              _context5.next = 3;
              break;
            }

            _context5.next = 3;
            return req.authUser.sendEmailVerificationEmail();

          case 3:
            return _context5.abrupt("return", res.json({
              message: 'Email confirmation resent.'
            }));

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function resendEmailConfirm(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Confirm user's account with email confirmation token
 *
 * @param {Object} req
 * @param {Object} res
 */


var emailConfirm = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var user, token;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _User["default"].findOneAndUpdate({
              email: req.authUser.email
            }, {
              emailConfirmCode: null,
              emailConfirmedAt: new Date()
            }, {
              "new": true
            });

          case 2:
            user = _context6.sent;
            token = user.generateToken();
            return _context6.abrupt("return", res.json({
              message: 'Email confirmed.',
              data: {
                user: user,
                token: token
              }
            }));

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function emailConfirm(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var _default = {
  login: login,
  register: register,
  emailConfirm: emailConfirm,
  resetPassword: resetPassword,
  forgotPassword: forgotPassword,
  resendEmailConfirm: resendEmailConfirm
};
exports["default"] = _default;