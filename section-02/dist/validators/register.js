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

var _validationSchemas = require("../validation-schemas");

/**
 * Validates the registration request
 *
 * @param {Object} req
 *
 * @param {Object} res
 *
 * @param {Function} next
 *
 *
 * @return {Object}
 */
var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, name, email, password, existingUser;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
            _context.prev = 1;
            _context.next = 4;
            return _validationSchemas.RegisterSchema.validate({
              name: name,
              email: email,
              password: password
            });

          case 4:
            _context.next = 6;
            return _User["default"].findOne({
              email: email
            });

          case 6:
            existingUser = _context.sent;

            if (!existingUser) {
              _context.next = 9;
              break;
            }

            throw new Yup.ValidationError('This email has already been taken.', req.body, 'email');

          case 9:
            return _context.abrupt("return", next());

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", res.status(422).json({
              message: 'Validation failed.',
              data: {
                errors: (0, _defineProperty2["default"])({}, _context.t0.path, _context.t0.message)
              }
            }));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 12]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;