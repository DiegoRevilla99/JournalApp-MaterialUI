import { Route, Routes, Navigate } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JornalRoutes } from "../journal/routes/JornalRoutes";
import { CheckingAuth } from "../ui/components/CheckingAuth";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const AppRouter = () => {
	const { status } = useCheckAuth();

	if (status === "checking") {
		return <CheckingAuth />;
	}

	return (
		<Routes>
			{status === "authenticated" ? (
				<Route path="/*" element={<JornalRoutes />} />
			) : (
				<Route path="/auth/*" element={<AuthRoutes />} />
			)}

			<Route path="/*" element={<Navigate to="/auth/login" />} />

			{/* Login y registro */}
			{/* <Route path="/auth/*" element={<AuthRoutes />} /> */}
			{/* JournalApp */}
			{/* // <Route path="/*" element={<JornalRoutes />} /> */}
			{/* <Route /> */}
		</Routes>
	);
};
