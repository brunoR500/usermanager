import { Router } from "express";
const router = Router();

import {
	getUsers,
	createUser,
	getUser,
	deleteUser,
	updateUser,
} from "../controller/user.controller";

router.route("/users").get(getUsers);
router.route("/users").post(createUser);

// e.g. get, delete http://localhost:3001/users/2
router.route("/users/:id").get(getUser);
router.route("/users/:id").delete(deleteUser);
router.route("/users/:id").put(updateUser);

export default router;
