import React from "react";
import { Redirect, Route } from "react-router";
import { useSessionStorage } from "../customHooks/useSessionStorage";

function ProtectedRoute({ component: Component, ...restOfProps }) {
	const [token] = useSessionStorage("token", null);

	return (
		<Route
			{...restOfProps}
			render={props =>
				token && token !== null && token !== null && token !== "null" ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
}

export default ProtectedRoute;
