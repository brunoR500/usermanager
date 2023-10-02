import { Request, Response } from "express";
import { client } from "../database";
import { User } from "../interface/interface";

export async function getUsers(req: Request, res: Response): Promise<Response> {
	try {
		const conn = await client();
		const courses = await conn.query("SELECT * FROM users");
		conn.end();
		return res.json(courses.rows);
	} catch (e) {
		console.log(e);
		return res.json({
			message: "Error",
		});
	}
}

export async function createUser(req: Request, res: Response) {
	try {
		const newUser: User = req.body;
		console.log("body " + newUser.first_name);
		const conn = await client();
		await conn.query(
			"INSERT INTO users (user_name, first_name, last_name, birthday, last_login, email, password) VALUES ($1, $2, $3, $4::date, $5::timestamp, $6, $7)",
			[
				newUser.user_name,
				newUser.first_name,
				newUser.last_name,
				newUser.birthday,
				newUser.last_login,
				newUser.email,
				newUser.password,
			]
		);
		conn.end();
		return res.json({
			message: "Created",
		});
	} catch (e) {
		console.log(e);
		return res.json({
			message: "Error",
		});
	}
}

export async function getUser(req: Request, res: Response): Promise<Response> {
	try {
		const id = req.params.id;
		const conn = await client();
		const User = await conn.query("SELECT * FROM users WHERE id = $1", [id]);
		conn.end();
		return res.json(User.rows);
	} catch (e) {
		console.log(e);
		return res.json({
			message: "Error",
		});
	}
}

export async function deleteUser(req: Request, res: Response) {
	try {
		const id = req.params.id;
		const conn = await client();
		await conn.query("DELETE FROM users WHERE id = $1", [id]);
		conn.end();
		return res.json({
			message: "Deleted",
		});
	} catch (e) {
		console.log(e);
		return res.json({
			message: "Error",
		});
	}
}

export async function updateUser(req: Request, res: Response) {
	try {
		const id = req.params.id;
		const updateUser: User = req.body;
		console.log("update " + updateUser.user_name);
		console.log(updateUser.last_login);
		const conn = await client();
		await conn.query(
			"UPDATE users SET user_name = $1, first_name = $2, last_name = $3, birthday = $4::date, last_login = $5::timestamp, email = $6, password = $7 WHERE id = $8",
			[
				updateUser.user_name,
				updateUser.first_name,
				updateUser.last_name,
				updateUser.birthday,
				updateUser.last_login,
				updateUser.email,
				updateUser.password,
				id,
			]
		);
		conn.end();
		return res.json({
			message: "Updated",
		});
	} catch (e) {
		console.log(e);
		return res.json({
			message: "Error",
		});
	}
}
