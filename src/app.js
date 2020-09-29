"use strict";
exports.__esModule = true;
var express_1 = require("express");
var index_routes_1 = require("./routes/index.routes");
var app = express_1["default"]();
//middlewares
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: false }));
//routes
app.use(index_routes_1["default"]);
exports["default"] = app;
