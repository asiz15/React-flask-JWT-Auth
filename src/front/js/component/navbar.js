import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
						<span>Login</span>
					</Link>
					<Link to="/demo" className="ml-5">
						<button className="btn btn-primary ml-3">Create account</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
