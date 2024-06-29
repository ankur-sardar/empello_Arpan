import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Get user from localStorage
// const user = JSON.parse(localStorage.getItem("user")!);
const dummyUser = {
	user_id: "bcd0da6a-218d-4033-a33b-0ffa64198ee1",
	token: "",
	refreshToken: "",
	email: "",
	role: "",
	active: true,
};
const initialState = {
	user: dummyUser,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// Register user
// export const register = createAsyncThunk(
// 	"auth/register",
// 	async (user, thunkAPI) => {
// 		try {
// 		  return await authService.register(user)
// 		} catch (error) {
// 		  const message =
// 		    (error.response &&
// 		      error.response.data &&
// 		      error.response.data.message) ||
// 		    error.message ||
// 		    error.toString()
// 		  return thunkAPI.rejectWithValue(message)
// 		}

// 		return null;
// 	}
// );

// Login user
// export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
// 	// try {
// 	//   return await authService.login(user)
// 	// } catch (error) {
// 	//   const message =
// 	//     (error.response && error.response.data && error.response.data.message) ||
// 	//     error.message ||
// 	//     error.toString()
// 	//   return thunkAPI.rejectWithValue(message)
// 	// }

// 	return null;
// });

export const logout = createAsyncThunk("auth/logout", async () => {
	// await authService.logout()
});

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder
			// .addCase(register.pending, (state) => {
			// 	state.isLoading = true;
			// })
			// .addCase(register.fulfilled, (state, action) => {
			// 	state.isLoading = false;
			// 	state.isSuccess = true;
			// 	state.user = dummyUser;
			// })
			// .addCase(register.rejected, (state, action) => {
			// 	state.isLoading = false;
			// 	state.isError = true;
			// 	// state.message = action.payload
			// 	state.user = dummyUser;
			// })
			// .addCase(login.pending, (state) => {
			// 	state.isLoading = true;
			// })
			// .addCase(login.fulfilled, (state, action) => {
			// 	state.isLoading = false;
			// 	state.isSuccess = true;
			// 	state.user = dummyUser;
			// })
			// .addCase(login.rejected, (state, action) => {
			// 	state.isLoading = false;
			// 	state.isError = true;
			// 	// state.message = action.payload
			// 	state.user = dummyUser;
			// })
			.addCase(logout.fulfilled, (state) => {
				state.user = dummyUser;
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
