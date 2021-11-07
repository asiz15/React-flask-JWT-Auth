import axios from "axios";

const baseURL = "https://3001-silver-marsupial-sh0r6092.ws-us18.gitpod.io/api";

export const API = {
	register: data => {
		const newUser = {
			method: "POST",
			url: `${baseURL}/register`,
			data
		};
		return axios(newUser);
	},
	login: data => {
		const login = {
			method: "POST",
			url: `${baseURL}/login`,
			data
		};
		return axios(login);
	}
};
