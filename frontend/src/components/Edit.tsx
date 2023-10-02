import {
	Alert,
	Button,
	IconButton,
	InputAdornment,
	Snackbar,
	Stack,
	TextField,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { userStore } from "../model/user";
import { Visibility, VisibilityOff } from "@mui/icons-material";

/**
   * @todo: This page should have a form with the following elements
   * - Customer number (five digits)
        - User name (read only)
        - First name (2 - 150 chars)
        - Last name (2 - 150 chars)
        - Email address (valid email address, max. 300 chars)
        - Date of birth (format: DD.MM.YYYY)
        - Last login (read only, format: DD.MM.YYYY HH:MM:SS)
        - Password (8 - 150 chars, field is optional)
        - Repeat Password
   * @todo: Only a valid form can be submitted. A success message should be displayed after a form submission.
   **/

const Edit = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm();

	const location = useLocation();
	const { userData } = location.state;

	const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			userStore.setStatus("");
			return;
		}
		userStore.setStatus("");
	};

	const matchPswd = (value: string) => {
		console.log("EDIT: " + userStore.status);
		if (value === getValues("password") && "" !== getValues("password")) {
			return false;
		} else {
			if ("" !== getValues("password")) {
				return true;
			}
		}
	};

	const opener = () => {
		console.log("something");
		console.log(userStore.status);
		if (userStore.status === "Updated") {
			return true;
		} else {
			return false;
		}
	};

	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	return (
		<div className="main-form-control">
			<h1>Edit</h1>
			<form
				onSubmit={handleSubmit((data) => {
					userStore.editUser(userData.id, JSON.stringify(data));
				})}
			>
				<Stack spacing={2}>
					<label>User Name</label>
					<TextField
						id="cy-uname"
						variant="filled"
						{...register("user_name", {
							value: userData.user_name || "",

							minLength: 3,
							maxLength: 30,
							pattern: /[A-Za-z0-9]/,
						})}
						placeholder="User name"
						required
					/>
					<label>First name</label>
					<TextField
						id="cy-fname"
						variant="filled"
						{...register("first_name", {
							value: userData.first_name || "",

							minLength: 2,
							maxLength: 150,
						})}
						placeholder="First name"
						required
					/>
					<label>Last name</label>
					<TextField
						id="cy-lname"
						variant="filled"
						{...register("last_name", {
							value: userData.last_name || "",

							minLength: 2,
							maxLength: 150,
						})}
						placeholder="Last name"
						required
					/>
					<label>Email name</label>
					<TextField
						id="cy-email"
						variant="filled"
						{...register("email", {
							value: userData.email || "",

							maxLength: 300,
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: "Entered value does not match email format",
							},
						})}
						placeholder="Email address"
						type="email"
						required
					/>
					<label>Birthday</label>
					<TextField
						id="cy-birthday"
						variant="filled"
						{...register("birthday", {
							value: new Date(userData.birthday).toISOString().split("T")[0] || "",
						})}
						placeholder="Date of birth (format: DD.MM.YYYY)"
						type="date"
						required
					/>
					<label>Last login</label>
					<TextField
						id="cy-llogin"
						variant="filled"
						{...register("last_login", {
							value: userData.last_login.substring(0, 16),
						})}
						placeholder="Last login(format: DD.MM.YYYY)"
						type="datetime-local"
						required
						InputProps={{
							readOnly: true,
						}}
					/>
					<label>Password</label>
					<TextField
						id="cy-pswd"
						variant="filled"
						{...register("password", {
							minLength: 2,
							maxLength: 150,
							required: "You must specify a password",
							value: userData.password,
						})}
						placeholder="Password"
						type="password"
						required
					/>
					<label>Repeat password</label>
					<TextField
						id="cy-rpswd"
						variant="filled"
						{...register("r_password", {
							validate: (value) => value === getValues("password"),
						})}
						placeholder="Repeat Password"
						type={showPassword ? "text" : "password"}
						required
						error={matchPswd(getValues("r_password"))}
						helperText={
							matchPswd(getValues("r_password")) ? "Password do not match" : ""
						}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
									>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<Button id="cy-sub-edit" variant="contained" type="submit">
						SUBMIT
					</Button>
				</Stack>
			</form>
			{/* FIXME: The snackbar does not work properly */}
			<Snackbar
				open={userStore.status === "Updated"}
				autoHideDuration={3000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
					The user is updated!
				</Alert>
			</Snackbar>
		</div>
	);
};

export default Edit;
