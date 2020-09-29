"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.createUser = exports.getUserByID = exports.getUsers = void 0;
const connection_1 = __importDefault(require("../database/connection"));
//get users
exports.getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryAll = 'SELECT * FROM users';
        const response = yield connection_1.default.query(queryAll);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('internal server error');
    }
});
//user by id
exports.getUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const queryID = 'SELECT * FROM users WHERE id = $1';
        const response = yield connection_1.default.query(queryID, [id]);
        if (response.rows.length < 1) {
            return res.status(200).json({
                message: 'ID NOT FOUND, TRY OTHER ID'
            });
        }
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('INTERNAL SERVER ERROR');
    }
});
//create user
exports.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const queryCreate = 'INSERT INTO users (name, email) VALUES ($1, $2)';
        //check all camps
        const checkEmail = /@/.test(email);
        if (name.length < 3 || checkEmail === false) {
            return res.status(200).json('Camp name or email invalid, try again with others credentials');
        }
        const response = yield connection_1.default.query(queryCreate, [name, email]);
        return res.status(200).json({
            message: 'User Created',
            userCreated: response.rowCount
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('INTERNAL SERVER ERROR');
    }
});
//delete user
exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const queryDelete = 'DELETE FROM users WHERE id = $1';
        const response = yield connection_1.default.query(queryDelete, [id]);
        return res.status(200).json({
            message: 'USER DELETED SUCCESSFOLY',
            eliminate: response.rowCount
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('INTERNAL SERVER ERROR');
    }
});
//update user
exports.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { name, email } = req.body;
        //check all camps
        const checkEmail = /@/.test(email);
        if (name.length < 3 || checkEmail === false) {
            return res.status(200).json('Camp name or email invalid, try again with others credentials');
        }
        const queryUpdate = 'UPDATE users SET name = $1, email = $2 WHERE id = $3';
        const response = yield connection_1.default.query(queryUpdate, [name, email, id]);
        //check user id found
        if (response.rowCount < 1) {
            return res.status(200).json({
                error: 'USER ID INVALID'
            });
        }
        return res.status(200).json({
            message: 'USER UPDATE SUCCESSFULY',
            userUpdated: response.rowCount
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('INTERNAL SERVER ERROR');
    }
});
