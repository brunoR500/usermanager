"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_controller_1 = require("../controller/user.controller");
router.route("/users").get(user_controller_1.getUsers);
router.route("/users").post(user_controller_1.createUser);
// e.g. get, delete http://localhost:3001/users/2
router.route("/users/:id").get(user_controller_1.getUser);
router.route("/users/:id").delete(user_controller_1.deleteUser);
router.route("/users/:id").put(user_controller_1.updateUser);
exports.default = router;
