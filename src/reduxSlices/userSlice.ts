import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import userService from "./services/userService";
import { submitGameData } from "./gameSlice";

type InitialStateType = {
	profileInfo: any;
	isError: boolean;
	isSuccess: boolean;
	isLoading: boolean;
	message: string;
	userListWithRank: any;
};
const initialState: InitialStateType = {
	profileInfo: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
	userListWithRank: null,
};

// Get user info by id
export const getUserInfoById = createAsyncThunk(
	"user/id",
	async (userId: string, thunkAPI: any) => {
		try {
			// const user = thunkAPI.getState().auth.user;
			// const { user_id } = user;
			// return await userService.getUserInfoById(token, user_id);
			return await userService.getUserInfoById(userId);
		} catch (error: any) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

//Get all user with rank
export const getAllUserWithRank = createAsyncThunk(
	"user/alluserwithrank",
	async (_, thunkAPI: any) => {
		try {
			return await userService.getAllUserWithRank();
		} catch (error: any) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserInfoById.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserInfoById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.profileInfo = action.payload;
			})
			.addCase(getUserInfoById.rejected, (state, _) => {
				state.isLoading = false;
				state.isError = true;
				// state.message = action.payload
			})
			.addCase(
				submitGameData.fulfilled,
				(state, action: PayloadAction<any>) => {
					const { game_point } = action.payload;
					if (state.profileInfo) {
						const prevPoint = state.profileInfo?.user_points || 0;
						state.profileInfo.user_points = prevPoint + game_point;
					}
				}
			)
			.addCase(getAllUserWithRank.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllUserWithRank.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.userListWithRank = action.payload;
			})
			.addCase(getAllUserWithRank.rejected, (state, _) => {
				state.isLoading = false;
				state.isError = true;
				// state.message = action.payload
			});
	},
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
