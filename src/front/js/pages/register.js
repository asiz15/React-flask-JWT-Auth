import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { API } from "../../API";
import { useHistory } from "react-router";

export const Register = () => {
	const { store, actions } = useContext(Context);
	const [user, setUser] = useState({
		email: null,
		password: null,
		confirmPassword: null
	});
	const [errorHandling, setErrorHandling] = useState({
		error: null,
		message: null
	});
	const history = useHistory();

	const createAccount = e => {
		e.preventDefault();
		if (user.email && user.password && user.password === user.confirmPassword && user.password !== null) {
			API.register({ email: user.email, password: user.password })
				.then(res => {
					console.log(res);
					return history.push("/login");
				})
				.catch(err => {
					if (err.message) {
						setErrorHandling({ error: true, message: err.response.data.message });
					}
				});
		}
	};

	return (
		<div className="main">
			<div className="login-form">
				<form onSubmit={createAccount}>
					<div className="form-group">
						<label>Email</label>
						<input
							onChange={e => setUser({ ...user, email: e.target.value })}
							type="email"
							className="form-control"
							placeholder="example@email.com"
							required
						/>
					</div>
					<div className="form-group mt-2">
						<label>Password</label>
						<input
							onChange={e => setUser({ ...user, password: e.target.value })}
							type="password"
							className="form-control"
							placeholder="Password"
						/>
					</div>
					<div className="form-group mt-2">
						<label>Confirm password</label>
						<input
							onChange={e => setUser({ ...user, confirmPassword: e.target.value })}
							type="password"
							className="form-control"
							placeholder="Password"
						/>
					</div>
					{user.password &&
						user.password !== user.confirmPassword && (
							<div className="p-3 mb-2 mt-2 bg-danger text-white">
								<span>Both passwords must match.</span>
							</div>
						)}
					{errorHandling.error && (
						<div className="p-3 mb-2 mt-2 bg-danger text-white">
							<span>{errorHandling.message}</span>
						</div>
					)}
					<button type="submit" className="btn btn-primary mt-3">
						Create account
					</button>
				</form>
			</div>
		</div>
	);
};
