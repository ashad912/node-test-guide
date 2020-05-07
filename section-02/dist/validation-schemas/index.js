"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswordSchema = exports.EmailConfirmationSchema = exports.ForgotPasswordSchema = exports.RegisterSchema = exports.LoginSchema = void 0;

var Yup = _interopRequireWildcard(require("yup"));

var LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).max(10).required()
});
exports.LoginSchema = LoginSchema;
var RegisterSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().min(6).max(10).required()
});
exports.RegisterSchema = RegisterSchema;
var ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email().required()
});
exports.ForgotPasswordSchema = ForgotPasswordSchema;
var EmailConfirmationSchema = Yup.object().shape({
  token: Yup.string().required()
});
exports.EmailConfirmationSchema = EmailConfirmationSchema;
var ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).max(10).required(),
  token: Yup.string().required()
});
exports.ResetPasswordSchema = ResetPasswordSchema;