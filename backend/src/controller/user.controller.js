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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getUser = exports.createUser = exports.getUsers = void 0;
const database_1 = require("../database");
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield (0, database_1.client)();
            const courses = yield conn.query("SELECT * FROM users");
            conn.end();
            return res.json(courses.rows);
        }
        catch (e) {
            console.log(e);
            return res.json({
                message: "Error",
            });
        }
    });
}
exports.getUsers = getUsers;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = req.body;
            console.log("body " + newUser.first_name);
            const conn = yield (0, database_1.client)();
            yield conn.query("INSERT INTO users (user_name, first_name, last_name, birthday, last_login, email, password) VALUES ($1, $2, $3, $4::date, $5::timestamp, $6, $7)", [
                newUser.user_name,
                newUser.first_name,
                newUser.last_name,
                newUser.birthday,
                newUser.last_login,
                newUser.email,
                newUser.password,
            ]);
            conn.end();
            return res.json({
                message: "Created",
            });
        }
        catch (e) {
            console.log(e);
            return res.json({
                message: "Error",
            });
        }
    });
}
exports.createUser = createUser;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const conn = yield (0, database_1.client)();
            const User = yield conn.query("SELECT * FROM users WHERE id = $1", [id]);
            conn.end();
            return res.json(User.rows);
        }
        catch (e) {
            console.log(e);
            return res.json({
                message: "Error",
            });
        }
    });
}
exports.getUser = getUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const conn = yield (0, database_1.client)();
            yield conn.query("DELETE FROM users WHERE id = $1", [id]);
            conn.end();
            return res.json({
                message: "Deleted",
            });
        }
        catch (e) {
            console.log(e);
            return res.json({
                message: "Error",
            });
        }
    });
}
exports.deleteUser = deleteUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const updateUser = req.body;
            console.log("update " + updateUser.user_name);
            console.log(updateUser.last_login);
            const conn = yield (0, database_1.client)();
            yield conn.query("UPDATE users SET user_name = $1, first_name = $2, last_name = $3, birthday = $4::date, last_login = $5::timestamp, email = $6, password = $7 WHERE id = $8", [
                updateUser.user_name,
                updateUser.first_name,
                updateUser.last_name,
                updateUser.birthday,
                updateUser.last_login,
                updateUser.email,
                updateUser.password,
                id,
            ]);
            conn.end();
            return res.json({
                message: "Updated",
            });
        }
        catch (e) {
            console.log(e);
            return res.json({
                message: "Error",
            });
        }
    });
}
exports.updateUser = updateUser;
