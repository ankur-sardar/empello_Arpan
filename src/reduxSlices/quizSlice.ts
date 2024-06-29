import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	error: {
		categories: false,
		subCategories: false,
		branches: false,
		allQuestions: false,
		quizLevels: false,
	},
	success: {
		categories: false,
		subCategories: false,
		branches: false,
		allQuestions: false,
		quizLevels: false,
	},
	loading: {
		categories: false,
		subCategories: false,
		branches: false,
		allQuestions: false,
		quizLevels: false,
	},
	message: "",
};

// Get quiz categories
// export const getQuizCategories = createAsyncThunk(
// 	"quiz/categories",
// 	async (_, thunkAPI: any) => {
// 		try {
// 			const token = thunkAPI.getState().auth.user.token;
// 			return await quizService.getQuizCategories(token);
// 		} catch (error: any) {
// 			const message =
// 				(error.response &&
// 					error.response.data &&
// 					error.response.data.message) ||
// 				error.message ||
// 				error.toString();
// 			return thunkAPI.rejectWithValue(message);
// 		}
// 	}
// );

export const quizSlice = createSlice({
	name: "quiz",
	initialState,
	reducers: {
		reset: () => initialState,
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(getQuizCategories.pending, (state) => {
	// 			state.loading = {
	// 				...state.loading,
	// 				categories: true,
	// 			};
	// 		})
	// 		.addCase(getQuizCategories.fulfilled, (state, action) => {
	// 			state.loading = {
	// 				...state.loading,
	// 				categories: false,
	// 			};
	// 			state.success = {
	// 				...state.success,
	// 				categories: true,
	// 			};
	// 			state.categories = action.payload;
	// 		})
	// 		.addCase(getQuizCategories.rejected, (state) => {
	// 			state.loading = {
	// 				...state.loading,
	// 				categories: false,
	// 			};
	// 			state.error = {
	// 				...state.error,
	// 				categories: false,
	// 			};
	// 		});
	// },
});

export const { reset } = quizSlice.actions;
export default quizSlice.reducer;
