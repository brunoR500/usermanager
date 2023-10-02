import request from "supertest";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import router from "../route/userRoute";
import { Server, IncomingMessage, ServerResponse } from "http";

describe("Simple test API - CRUD", () => {
	var appServer: Server<typeof IncomingMessage, typeof ServerResponse>;
	var id = 0;

	beforeAll(() => {
		const app = express();
		app.use(helmet());
		app.use(cors());
		app.use(express.json());
		app.use(express.urlencoded({ extended: false }));
		app.use(router);

		const PORT: Number = 3002;
		appServer = app.listen(PORT, () => {
			console.log(`Application started on port ${PORT}!`);
		});
	});

	afterAll(() => {
		appServer.close();
	});

	it("dummy test", () => {
		const d_string = "tests";
		expect(d_string).toBe("tests");
	});

	it("POST /users - Create new user", async () => {
		const rUser = `jestBE_test01`;
		const res = await request(appServer).post("/users").send({
			user_name: rUser,
			first_name: "jestF",
			last_name: "jestL",
			birthday: "2023-01-17",
			last_login: "2023-01-17",
			email: "jest@mobx.ed",
		});
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toBe("Created");
		// console.log = jest.fn();
		// log(res.body.message);
	});

	it("GET /users - Get all users", async () => {
		const res = await request(appServer).get("/users");
		expect(res.statusCode).toBe(200);
		expect(res.body.length).toBeGreaterThan(0);
		id = res.body.at(-1).id;
	});

	it("UPDATE /users/:id - Update an user", async () => {
		const newUser = `NEW_jestBEP${Math.floor(Math.random() * 100000)}`;
		const res = await request(appServer).put(`/users/${id}`).send({
			user_name: newUser,
			first_name: "jestF",
			last_name: "jestL",
			birthday: "2023-01-18",
			last_login: "2023-01-18",
			email: "jest@mobx.de",
		});
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toBe("Updated");
	});

	it("DELETE /users/:id - Delete the user with id: 1", async () => {
		const res = await request(appServer).delete(`/users/${id}`);
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toBe("Deleted");
	});
});
