import {
	Alert,
	Button,
	IconButton,
	InputAdornment,
	Snackbar,
	Stack,
	TextField,
} from "@mui/material";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { userStore } from "../model/user";
import "./Add.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";

/**
   * @todo: This page should have a form with following elements
   * - Customer number (five digits)
        - User name (value must be unique in the db, 3 - 30 chars, format: A-Za-z0-9)
        - First name (2 - 150 chars)
        - Last name (2 - 150 chars)
        - Email address (valid email address, max. 300 chars)
        - Date of birth (format: DD.MM.YYYY)
        - Password (8 - 150 chars)
        - Repeat Password
   * @todo: Only a valid form can be submitted. A success message should be displayed after a form submission.
   **/

const Add = () => {
	const {
		register,
		handleSubmit,
		formState,
		formState: { isSubmitSuccessful },
		reset,
		getValues,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset({
				user_name: "",
				first_name: "",
				last_name: "",
				email: "",
				birthday: "",
				password: "",
				r_password: "",
			});
		}
	}, [formState, reset]);

	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			userStore.setStatus("");
			return;
		}
		userStore.setStatus("");
	};

	const matchPswd = (value: string) => {
		console.log(userStore.status);
		if (value === getValues("password") && "" !== getValues("password")) {
			return false;
		} else {
			if ("" !== getValues("password")) {
				return true;
			}
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
			<h1>Add User</h1>
			<form
				onSubmit={handleSubmit(async (data) => {
					userStore.addUser(JSON.stringify(data));
				})}
			>
				<Stack spacing={2}>
					<label>User Name</label>
					<TextField
						id="cy-uname"
						variant="filled"
						{...register("user_name", {
							minLength: 3,
							maxLength: 30,
							pattern: /[A-Za-z0-9]/,
							validate: {
								checkUser: (value) =>
									!userStore.users.some((i) => i.user_name.includes(value)) ||
                  "Username is already used!",
							},
						})}
						error={
							userStore.users.some((i) =>
								i.user_name.includes(getValues("user_name"))
							) && getValues("user_name") !== ""
						}
						helperText={
							userStore.users.some((i) =>
								i.user_name.includes(getValues("user_name"))
							) && getValues("user_name") !== ""
								? "Username is already used!"
								: ""
						}
						required
						placeholder="User name"
					/>
					<label>First name</label>
					<TextField
						id="cy-fname"
						variant="filled"
						{...register("first_name", {
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
					{/* TODO: date format must be DD.MM.YYYY; actually is MM.DD.YYYY
						TODO: to add MobileDatePicker */}
					<label>Birthday</label>
					<TextField
						id="cy-birthday"
						variant="filled"
						{...register("birthday")}
						placeholder="Date of birth (format: DD.MM.YYYY)"
						type="date"
						required
					/>
					<label>Password</label>
					<TextField
						id="cy-pswd"
						variant="filled"
						{...register("password", {
							minLength: 2,
							maxLength: 150,
							required: "You must specify a password",
						})}
						placeholder="Password"
						type={showPassword ? "text" : "password"}
						required
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
					<Button id="cy-sub-add" variant="contained" type="submit">
            SUBMIT
					</Button>
				</Stack>
			</form>
			<Snackbar
				open={userStore.status === "Created"}
				autoHideDuration={3000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          The new user is created!
				</Alert>
			</Snackbar>
		</div>
	);
};

export default observer(Add);
