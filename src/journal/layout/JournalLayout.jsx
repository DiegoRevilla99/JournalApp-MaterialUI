import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Navbar, SideBar } from "../components";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
	return (
		<Box sx={{ display: "flex" }}>
			<Navbar drawerWidth={drawerWidth} />

			<SideBar drawerWidth={drawerWidth} />

			<Box component="main" sx={{ flexGrow: 1, p: 2 }}>
				<Toolbar />

				{children}
			</Box>
		</Box>
	);
};
