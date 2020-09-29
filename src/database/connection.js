"use strict";
exports.__esModule = true;
var pg_1 = require("pg");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL
});
exports["default"] = pool;
