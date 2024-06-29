import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reduxSlices/authSlice";
import quizReducer from "./reduxSlices/quizSlice";
import userReducer from "./reduxSlices/userSlice";
import gameReducer from "./reduxSlices/gameSlice";
import appReducer from "./reduxSlices/appSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		quiz: quizReducer,
		user: userReducer,
		game: gameReducer,
		app: appReducer,
	},
	devTools: true,
});

export default store;
