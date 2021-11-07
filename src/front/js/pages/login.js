import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { API } from "../../API";
import { useHistory } from "react-router";
import { useSessionStorage } from "../customHooks/useSessionStorage";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [token, setToken] = useSessionStorage("token", null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [credentials, setCredentials] = useState({
		email: null,
		password: null
	});

	useEffect(
		() => {
			if (token === null || token === "null") {
				setIsLoggedIn(false);
			} else {
				setIsLoggedIn(true);
			}
		},
		[token]
	);

	const history = useHistory();
	const handleLogout = () => {
		setToken(null);
	};
	const loginHandler = e => {
		e.preventDefault();
		if (credentials.email && credentials.password) {
			API.login({ email: credentials.email, password: credentials.password })
				.then(res => {
					console.log(res);
					setToken(res.data.token);
					history.push("/");
				})
				.catch(err => {
					console.log(err);
				});
		}
	};
	return (
		<div className="main">
			{!isLoggedIn && (
				<div className="login-form">
					<form onSubmit={loginHandler}>
						<div className="form-group">
							<label>Email</label>
							<input
								onChange={e => setCredentials({ ...credentials, email: e.target.value })}
								type="text"
								className="form-control"
								placeholder="example@email.com"
							/>
						</div>
						<div className="form-group">
							<label>Password</label>
							<input
								onChange={e => setCredentials({ ...credentials, password: e.target.value })}
								type="password"
								className="form-control"
								placeholder="Password"
							/>
						</div>
						<button type="submit" className="btn btn-primary mt-3">
							Login
						</button>
					</form>
				</div>
			)}
			{isLoggedIn && (
				<div style={{ display: "flex", flexDirection: "column" }}>
					You are already logged in!
					<button className="btn btn-danger" onClick={handleLogout}>
						Log out
					</button>
				</div>
			)}
		</div>
	);
};
