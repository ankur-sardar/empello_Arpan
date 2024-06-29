import { useEffect, useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import loogoSrc from "/images/logo.svg";
import {
	useNavigate,
	useLocation,
	Outlet,
	useSearchParams,
} from "react-router-dom";
import { application_pages } from "../data";
import { useAppDispatch } from "../utils/hooks";
import { navigateAwayFromGame } from "../reduxSlices/appSlice";
import { getUserInfoById } from "../reduxSlices/userSlice";

const Layout = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();
	const userId = searchParams.get("uid");
	const userIdFromLocalStorage = localStorage.getItem("userId");

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const regex =
		"/playground/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}";

	useEffect(() => {
		if (userId) {
			localStorage.setItem("userId", userId);
			dispatch(getUserInfoById(userId));
		} else if (!userId && userIdFromLocalStorage) {
			dispatch(getUserInfoById(userIdFromLocalStorage));
		} else {
			// window.location.href = "http://localhost:9000/";
			window.location.href = "https://demo.xr-academy.com/";
		}
	}, [userId, userIdFromLocalStorage]);

	const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorEl(null);
	};

	const changeNavigation = (pathTo: string) => {
		if (pathname.match(regex)) {
			dispatch(navigateAwayFromGame());
		} else {
			navigate(pathTo);
			setAnchorEl(null);
		}
	};

	const goToHome = () => {
		if (pathname === "/") {
			// window.location.href = "http://localhost:9000/";
			window.location.href = "https://demo.xr-academy.com/";
		} else {
			// if (pathname.match(regex)) {
			// 	dispatch(navigateAwayFromGame());
			// } else {
			// 	navigate("/");
			// 	setAnchorEl(null);
			// }
			navigate("/");
			setAnchorEl(null);
		}
	};
	return (
		<>
			<div className="navigationBar_container">
				{!pathname.match(regex) && (
					<AppBar position="fixed" className="navigationBar_container_appBar">
						<Toolbar disableGutters>
							<Box sx={{ flexGrow: 0 }}>
								<IconButton onClick={goToHome}>
									<ArrowBackIosNewIcon
										style={{
											border: "1px solid #fff",
											borderRadius: "50%",
											padding: 5,
											color: "#fff",
										}}
									/>
								</IconButton>
							</Box>
							<Box sx={{ flexGrow: 1, display: "flex" }}>
								<img
									src={loogoSrc}
									className="appbar_logo animated fadeInUp delay-0"
								/>
							</Box>
							<Box sx={{ flexGrow: 0 }}>
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleOpenNavMenu}
									color="inherit"
								>
									<MenuIcon
										style={{
											border: "1px solid #fff",
											borderRadius: "50%",
											padding: 5,
										}}
									/>
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorEl)}
									onClose={handleCloseNavMenu}
								>
									{application_pages.map((page) => (
										<MenuItem
											key={page.id}
											onClick={() => changeNavigation(page.path)}
										>
											<Typography textAlign="center">{page.name}</Typography>
										</MenuItem>
									))}
								</Menu>
							</Box>
						</Toolbar>
					</AppBar>
				)}
			</div>
			<div
				className={`body_container ${
					pathname.match(regex) ? "paddingTop16" : ""
				}`}
			>
				<Outlet />
			</div>
		</>
	);
};

export default Layout;
