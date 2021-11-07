import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { useSessionStorage } from "../customHooks/useSessionStorage";
import { useHistory } from "react-router";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [token, setToken] = useSessionStorage("token", null);
	const history = useHistory();

	const handleLogout = () => {
		setToken(null);
		setTimeout(() => {
			history.push("/login");
		}, 500);
	};

	return (
		<div className="text-center mt-5">
			<h2>You are logged in!</h2>
			<button className="btn btn-danger" onClick={handleLogout}>
				Log out
			</button>
		</div>
	);
};
