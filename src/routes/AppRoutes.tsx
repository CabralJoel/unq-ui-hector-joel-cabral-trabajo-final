import { lazy } from "react";
import { Route, Routes } from "react-router";

const GamePage = lazy(() => import("../pages/GamePage"));

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" Component={GamePage} />
		</Routes>
	);
};
