import {
	LOGINUSER,
	SET_AUTH_LOADER,
	CLOSE_AUTH_LOADER,
	LOGOUT,
} from "../constants";


const initState = {
	user: {},
	isAuth:false,
	isLoading: false,
};

const AuthReducer = (state = initState, action) => {
	if (action.type === LOGINUSER) {
		return { ...state, user: action.payload, isAuth: true };
	}
	if (action.type === SET_AUTH_LOADER) {
		return { ...state, isLoading: true };
	}
	if (action.type === CLOSE_AUTH_LOADER) {
		return { ...state, isLoading: false };
	}
	if (action.type === LOGOUT) {
		return { ...state, user: {}, isAuth: false };
	}
	return state;
};

export default AuthReducer;
