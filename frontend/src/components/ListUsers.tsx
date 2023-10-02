import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	GridToolbar,
	GridValueGetterParams,
} from "@mui/x-data-grid";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userStore } from "../model/user";
import "./ListUsers.scss";

/**
 * @todo: each row must have also an option to edit and to delete
 * @todo: the table must sortable (asc/desc)
 * @todo: option to create a new user
 * @todo: search form for finding users by a certain keyword in fields:
 * customer number, user name, first name, last name and email address
 **/

const SearchFieldUI = (props: any) => {
	const { oneClick } = props;
	const [searchInput, setSearchInput] = useState("");

	return (
		<div>
			<Grid className="btn-grid" container spacing={0.5}>
				<Grid item xs>
					<TextField
						id="outlined-search"
						label="Search field"
						type="search"
						fullWidth
						onChange={(val) => setSearchInput(val.target.value)}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								oneClick(searchInput);
							}
						}}
					/>
				</Grid>
				<Grid item alignItems="stretch" style={{ display: "flex" }} xs={4}>
					<Button
						variant="contained"
						size="small"
						onClick={() => oneClick(searchInput)}
					>
						Search
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

const columns: GridColDef[] = [
	{ field: "id", headerName: "CustomerNr.", width: 130 },
	{
		field: "user_name",
		headerName: "Username",
		width: 180,
		editable: true,
	},
	{
		field: "first_name",
		headerName: "First name",
		width: 180,
		editable: true,
	},
	{
		field: "last_name",
		headerName: "Last name",
		width: 180,
		editable: true,
	},
	{
		field: "last_login",
		headerName: "Last login",
		width: 180,
		editable: true,
		valueGetter: (params: GridValueGetterParams) =>
			`${params.row.last_login.replace("T", " - ").slice(0, 21) || ""}`,
	},
	{
		field: "options",
		headerName: "",
		width: 200,
		sortable: false,
		renderCell: (params: GridRenderCellParams) => (
			<div>
				<Link
					className="links"
					to={`edit/${params.id}`}
					state={{ userData: toJS(params.row) }}
				>
					<Button>✏️ EDIT</Button>
				</Link>
				{/* <Button
					onClick={() => {
						console.log(toJS(params.row));
					}}
				>
					✏️ EDIT
				</Button> */}
				<Button
					color="warning"
					onClick={() => {
						console.log(params.id.toString());
						userStore.deleteUser(parseInt(params.id.toString(), 10));
					}}
				>
					❌ Delete
				</Button>
			</div>
		),
	},
];

const ListUsersUI = () => {
	useEffect(() => {
		userStore.Users();
	}, []);

	const rows = userStore.users;

	const handleClick = () => {
		// userStore.Users();
		// let usersM = userStore.users;
		userStore.searchUsers("mobx");
	};
	return (
		<Fragment>
			<h1>List Users</h1>
			{/* <Button className="bt-ui" variant="contained" onClick={handleClick}>
						test fetch
					</Button> */}
			<SearchFieldUI oneClick={(val: string) => userStore.searchUsers(val)} />
			<DataGrid
				rows={rows}
				columns={columns}
				rowsPerPageOptions={[15]}
				checkboxSelection
				disableSelectionOnClick
				autoHeight
				pageSize={15}
				disableColumnFilter
				disableColumnSelector
				disableDensitySelector
				components={{ Toolbar: GridToolbar }}
				componentsProps={{
					toolbar: {
						showQuickFilter: true,
						quickFilterProps: { debounceMs: 500 },
					},
				}}
			/>
		</Fragment>
	);
};

export default observer(ListUsersUI);
