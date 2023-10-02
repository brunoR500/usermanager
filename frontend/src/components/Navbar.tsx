import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import {
	AppBar,
	Container,
	Toolbar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Typography,
	Button,
} from "@mui/material";

const NavbarUI = () => {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					{/* mobile */}
					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							≣
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							<MenuItem onClick={handleCloseNavMenu}>
								<Link className="links" to="/">
									<Typography textAlign="center">List Users</Typography>
								</Link>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu}>
								<Link className="links" to="/add">
									<Typography textAlign="center">Add User</Typography>
								</Link>
							</MenuItem>
						</Menu>
					</Box>
					{/* desktop */}
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						<Link className="links" to="/">
							<Button
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block", fontSize: 20 }}
							>
								List Users
							</Button>
						</Link>
						<Link className="links" to="/add">
							<Button
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block", fontSize: 20 }}
							>
								Add User
							</Button>
						</Link>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default NavbarUI;
