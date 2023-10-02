import pg from "pg";
import "dotenv/config";

export async function client() {
	const client = new pg.Client({
		host: process.env.HOST_DB_PG,
		port: parseInt(process.env.HOST_DB_PG_HOST!),
		user: process.env.USER_DB_PG,
		password: process.env.USER_PASSWORD_DB_PG,
		database: process.env.DB_PG,
	});

	await client.connect();

	return client;
}
