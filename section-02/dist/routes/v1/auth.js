"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("../../controllers/auth.controller"));

var _auth2 = _interopRequireDefault(require("../../middleware/auth"));

var _login = _interopRequireDefault(require("../../validators/login"));

var _register = _interopRequireDefault(require("../../validators/register"));

var _resetPassword = _interopRequireDefault(require("../../validators/reset-password"));

var _forgotPassword = _interopRequireDefault(require("../../validators/forgot-password"));

var _emailConfirmation = _interopRequireDefault(require("../../validators/email-confirmation"));

/** Create a new auth router  */
var authRouter = new _express.Router();
/** Route for generating jsonwebtoken for an already existing user */

authRouter.post('/login', _login["default"], _auth["default"].login);
/** Route for registering a new user  */

authRouter.post('/register', _register["default"], _auth["default"].register);
/** Route for requesting a password reset email  */

authRouter.post('/passwords/email', _forgotPassword["default"], _auth["default"].forgotPassword);
/** Route for resetting user password  */

authRouter.post('/passwords/reset', _resetPassword["default"], _auth["default"].resetPassword);
authRouter.post('/emails/confirm', _emailConfirmation["default"], _auth["default"].emailConfirm);
/** Route for resending confirmation email  */

authRouter.post('/emails/confirm/resend', _auth2["default"], _auth["default"].resendEmailConfirm);
var _default = authRouter;
exports["default"] = _default;