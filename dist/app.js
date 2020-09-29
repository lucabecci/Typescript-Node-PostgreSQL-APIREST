"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const app = express_1.default();
//middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//routes
app.use(index_routes_1.default);
exports.default = app;
