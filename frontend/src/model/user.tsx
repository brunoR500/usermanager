import { makeAutoObservable, runInAction, toJS } from "mobx";

export class User {
	public id?: number;
	public user_name: string = "";
	public first_name: string = "";
	public last_name: string = "";
	public birthday: Date = new Date();
	public last_login: Date = new Date();
	public email: string = "";
	public password: string = "";

	constructor() {
		makeAutoObservable(this);
	}

	public get computed() {
		return new Date().getFullYear() - this.birthday.getFullYear();
	}
}

export class UserStore {
	public users: Array<User> = [];
	public status: string = "";
	// TODO: Webpack
	private baseURL = "http://localhost:3001/users/";

	constructor() {
		makeAutoObservable(this);
	}

	public Users() {
		try {
			console.log("Get all date");
			fetch(this.baseURL)
				.then((response) => response.json())
				.then((data) => {
					this.setUsers(data);
				});
		} catch (e) {
			console.log(e);
		}
	}

	public searchUsers(Searchtext: string) {
		if (Searchtext !== "") {
			const filteredRows = this.users.filter((row: User) => {
				return row.user_name.toLowerCase().includes(Searchtext.toLowerCase());
			});
			console.log(toJS(filteredRows));
			this.setUsers(filteredRows);
		} else {
			this.Users();
		}
	}

	public setUsers(users: Array<User>) {
		this.users = users;
	}

	public setStatus(status: string) {
		this.status = status;
	}

	public async addUser(data: string) {
		try {
			let obj: User = JSON.parse(data);
			console.log("POST" + obj);
			this.setStatus("pending");
			obj.last_login = new Date();
			console.log(obj.last_login);

			fetch(this.baseURL, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					user_name: obj.user_name,
					first_name: obj.first_name,
					last_name: obj.last_name,
					last_login: obj.last_login.toISOString(),
					birthday: obj.birthday.toString(),
					email: obj.email,
					password: obj.password,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					this.Users();
					this.setStatus(data.message);
				});
		} catch (e) {
			this.setStatus("failed");
			console.log(e);
		}
	}

	public editUser(id: number, data: string) {
		try {
			let obj: User = JSON.parse(data);
			this.setStatus("pending");
			console.log("PUT" + obj);
			obj.last_login = new Date();

			fetch(this.baseURL + id, {
				method: "PUT",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					user_name: obj.user_name,
					first_name: obj.first_name,
					last_name: obj.last_name,
					last_login: obj.last_login.toISOString(),
					birthday: obj.birthday.toString(),
					email: obj.email,
					password: obj.password,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log("edit user MobX : " + data.message);
					this.setStatus(data.message);
					this.Users();
				});
		} catch (e) {
			this.setStatus("failed");
			console.log(e);
		}
	}

	public deleteUser(id: number) {
		try {
			this.setStatus("pending");
			fetch(this.baseURL + id.toString(), {
				method: "DELETE",
			})
				.then((response) => response.json())
				.then((data) => {
					this.Users();
					this.setStatus(data.message);
				});
		} catch (e) {
			this.setStatus("failed");
			console.log(e);
		}
	}
}

export const userStore = new UserStore();
