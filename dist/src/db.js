"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = require("mysql2/promise");
const config_1 = require("config");
exports.pool = (0, promise_1.createPool)({
    port: config_1.DB_PORT,
    user: config_1.DB_USER,
    host: config_1.DB_HOST,
    password: config_1.DB_PASSWORD,
    database: config_1.DB_DATABASE
});
