import {
	LOGINUSER,
	SET_AUTH_LOADER,
	CLOSE_AUTH_LOADER,
	LOGOUT,
} from "../constants";
import axios from "axios";

export const authenticate = (token) => {
	return async (dispatch) => {

		const config = {
			headers: {
				"Content-Type": "application/json",
				authorization: `token ${token}`,
			},
		};
		dispatch({ type: SET_AUTH_LOADER });
		try {
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
				config
			);
			dispatch({ type: CLOSE_AUTH_LOADER });
			dispatch({ type: LOGINUSER, payload: data });
		} catch (error) {
			dispatch({ type: CLOSE_AUTH_LOADER });
			localStorage.clear();
		}
	};
};

export const logout = (token) => {
	return async (dispatch) => {

	
		const config = {
			headers: {
				"Content-Type": "application/json",
				authorization: `token ${token}`,
			},
		};
		const data = {};
		dispatch({ type: SET_AUTH_LOADER });
		try {
			console.log("Clearing the local storage");
			const { resData } = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
				data,
				config
			);
		
			console.log(resData)


			dispatch({ type: CLOSE_AUTH_LOADER });
			dispatch({ type: LOGOUT });
		} catch (error) {
			dispatch({ type: CLOSE_AUTH_LOADER });
		}
	};
};
