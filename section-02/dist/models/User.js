"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.UserSchema = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = _interopRequireDefault(require("../config"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mail = _interopRequireDefault(require("@fullstackjs/mail"));

var _randomstring = _interopRequireDefault(require("randomstring"));

var _PasswordReset = _interopRequireDefault(require("./PasswordReset"));

var UserSchema = new _mongoose["default"].Schema({
  name: String,
  email: String,
  createdAt: Date,
  updatedAt: Date,
  password: String,
  emailConfirmedAt: Date,
  emailConfirmCode: String
});
/**
 * Hash and save the user's password before
 * saving to the database
 *
 * @return {null}
 */

exports.UserSchema = UserSchema;
UserSchema.pre('save', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          this.password = _bcryptjs["default"].hashSync(this.password);
          this.emailConfirmCode = _randomstring["default"].generate();

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
/**
 * Send user email confirmation code after registration.
 *
 * @return {null}
 */

UserSchema.post('save', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return this.sendEmailVerificationEmail();

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));
/**
 * Compare password with user's hashed password on file.
 *
 * @return {boolean}
 */

UserSchema.methods.comparePasswords = function (password) {
  return _bcryptjs["default"].compareSync(password, this.password);
};
/**
 * Generate a jwt for this user.
 *
 * @return {string}
 */


UserSchema.methods.generateToken = function () {
  return _jsonwebtoken["default"].sign({
    id: this._id
  }, _config["default"].jwtSecret);
};
/**
 * Send account confirmation email
 *
 * @return {Promise}
 */


UserSchema.methods.sendEmailVerificationEmail = function () {
  return new _mail["default"]('confirm-email').to(this.email).subject('Please confirm your email address.').data({
    name: this.name,
    url: "".concat(_config["default"].url, "/auth/emails/confirm/").concat(this.emailConfirmCode)
  }).send();
};
/**
 * Handle forgot password for user.
 *
 * @return {Promise}
 */


UserSchema.methods.forgotPassword = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
  var token;
  return _regenerator["default"].wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          token = _randomstring["default"].generate(32);
          _context3.next = 3;
          return _PasswordReset["default"].create({
            token: token,
            email: this.email,
            createdAt: new Date()
          });

        case 3:
          _context3.next = 5;
          return this.sendForgotPasswordEmail(token);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this);
}));
/**
 * Send a password reset email to this user.
 *
 * @return {Promise}
 */

UserSchema.methods.sendForgotPasswordEmail = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(token) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return new _mail["default"]('forgot-password').to(this.email).subject('You requested for a password reset.').data({
              name: this.name,
              url: "".concat(_config["default"].url, "/auth/passwords/reset/").concat(token)
            }).send();

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x) {
    return _ref4.apply(this, arguments);
  };
}();

var _default = _mongoose["default"].model('User', UserSchema);

exports["default"] = _default;