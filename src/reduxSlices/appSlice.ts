import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	navigateAway: false,
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		navigateAwayFromGame: (state) => {
			state.navigateAway = true;
		},
		stayOngame: (state) => {
			state.navigateAway = false;
		},
		resetNavigateAwayFromGame: (state) => {
			state.navigateAway = false;
		},
	},
});

export const { navigateAwayFromGame, stayOngame, resetNavigateAwayFromGame } =
	appSlice.actions;
export default appSlice.reducer;
