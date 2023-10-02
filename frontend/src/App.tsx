import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ListUsers from "./components/ListUsers";
import Add from "./components/Add";
import Edit from "./components/Edit";
import { NoPage } from "./components/NoPage";
import "./App.scss";
import { observer } from "mobx-react";
import { Card, CardContent } from "@mui/material";

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Navbar />
				<Card>
					<CardContent>
						<Routes>
							<Route index element={<ListUsers />} />
							<Route path="add" element={<Add />} />
							<Route path="edit/:id" element={<Edit />} />
							<Route path="*" element={<NoPage />} />
						</Routes>
					</CardContent>
				</Card>
			</BrowserRouter>
		</div>
	);
};

export default observer(App);
