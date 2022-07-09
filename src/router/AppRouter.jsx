import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JornalRoutes } from "../journal/routes/JornalRoutes";

export const AppRouter = () => {
	return (
		<Routes>
			{/* Login y registro */}
			<Route path="/auth/*" element={<AuthRoutes />} />

			{/* JournalApp */}
			<Route path="/*" element={<JornalRoutes />} />

			<Route />
		</Routes>
	);
};
