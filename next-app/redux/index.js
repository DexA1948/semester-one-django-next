import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import AuthReducer from "./reducers/authReducer";
import { composeWithDevTools } from "@redux-devtools/extension";

// Add all reducers
const rootReducers = combineReducers({
	AuthReducer,
});

// middlewares
const middlewares = [thunkMiddleware];

// Create redux store
const Store = configureStore({
	reducer: rootReducers,
	middleware: middlewares,
	devTools:
		process.env.NODE_ENV !== "production"
			? composeWithDevTools()
			: composeWithDevTools({}),
});

export default Store;
