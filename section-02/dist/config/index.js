"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var _default = {
  url: process.env.APP_URL || 'http://localhost:3001',
  port: process.env.PORT || 3001,
  environment: process.env.NODE_ENV || 'development',
  databaseUrl: {
    development: process.env.DEVELOPMENT_DATABASE_URL || 'mongodb://localhost:27017/mernmongo',
    production: process.env.PRODUCTION_DATABASE_URL || 'mongodb://localhost:27017/mernmongo_production',
    test: process.env.TEST_DATABASE_URL || 'mongodb://localhost:27017/mernmongo_test'
  },
  jwtSecret: process.env.JWT_SECRET || '1234',
  development: process.env.NODE_ENV === 'development',
  production: process.env.NODE_ENV === 'production',
  test: process.env.NODE_ENV === 'test'
};
exports["default"] = _default;