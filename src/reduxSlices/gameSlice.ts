import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import {
	newGameResponsetDataType,
	newGameRequestDataType,
} from "../dataTypes/index";
import quizService from "./services/quizService";
import {
	getCategoryName,
	checkQuestionAnswer,
	createQuestionSet,
} from "../data/utils";

type InitialStateType = {
	gamesInProgressList: newGameResponsetDataType[] | null;
	currentGame: newGameResponsetDataType | null;
	currentGameCategory: string;
	currentGameCategoryDescription: string;
	loading: boolean;
	error: string | null;
	playedGameList: any[] | null;
};
const initialState: InitialStateType = {
	gamesInProgressList: null,
	currentGame: null,
	currentGameCategory: "",
	currentGameCategoryDescription: "",
	loading: false,
	error: null,
	playedGameList: null,
};

export const createNewGame = createAsyncThunk(
	"game/createnewgame",
	async (newGameData: newGameRequestDataType, thunkAPI: any) => {
		try {
			const {
				id,
				attempted,
				correct,
				game_meta_id,
				no_of_break,
				remaining,
				wrong,
			} = await quizService.createNewQuizGame(newGameData);

			return {
				...newGameData,
				game_inprogress_users_id: id,
				attempted,
				correct,
				game_meta_id,
				no_of_break,
				remaining,
				wrong,
			};
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

export const getGameData = createAsyncThunk(
	"game/getgamedata",
	async (criteria: any, thunkAPI: any) => {
		const { gameId, userId } = criteria;
		try {
			const gameData = await quizService.getGameDataById(gameId, userId);
			return {
				...gameData,
			};
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

export const submitGameData = createAsyncThunk(
	"game/submitgamedata",
	async (updatedGameData: any, thunkAPI: any) => {
		try {
			const { correct, wrong, game_status_id, attempted } = updatedGameData;
			const response = await quizService.submitGameData(updatedGameData);

			return { ...response, correct, wrong, game_status_id, attempted };
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

export const getLastPlayedQuizes = createAsyncThunk(
	"game/getplayedquizes",
	async (userId: string, thunkAPI: any) => {
		try {
			const gameData = await quizService.getPlayedQuizGames(userId);
			return [...gameData];
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

export const gameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {
		resetCurrentGame: (state) => {
			state.currentGame = null;
			state.currentGameCategory = "";
			state.currentGameCategoryDescription = "";
		},
		resetCurrentGameCategory: (state) => {
			state.currentGameCategory = "";
			state.currentGameCategoryDescription = "";
		},
		setCurrentGameCategory: (state, action: PayloadAction<any>) => {
			state.currentGameCategory = action.payload.categoryName;
			state.currentGameCategoryDescription = action.payload.categoryDescription;
		},
		setCurrentQuestionSelectedAnswer: (state, action: PayloadAction<any>) => {
			const { selectedAnswer, currentQuestionIndex } = action.payload;
			if (state.currentGame) {
				state.currentGame.formatted_questions[
					currentQuestionIndex
				].selectedOption = selectedAnswer;

				//To set the current question as attempted instantly when clicked - START
				const currentQuestion =
					state.currentGame.formatted_questions[currentQuestionIndex];
				const { questionId, selectedOption } = currentQuestion;
				//check if selectedOption is correct
				const answerStatus = checkQuestionAnswer(questionId, selectedOption);

				if (answerStatus === "correct") {
					currentQuestion.correct = true;
				} else {
					currentQuestion.wrong = true;
				}
				currentQuestion.attempted = true;

				//To set the current question as attempted instantly when clicked - START
			}
		},
		setCurrentQuestionAttempt: (state, action: PayloadAction<number>) => {
			const currentQuestionIndex = action.payload;

			if (state.currentGame) {
				const currentQuestion =
					state.currentGame.formatted_questions[currentQuestionIndex];
				const { questionId, selectedOption } = currentQuestion;
				//check if selectedOption is correct
				const answerStatus = checkQuestionAnswer(questionId, selectedOption);

				if (answerStatus === "correct") {
					currentQuestion.correct = true;
				} else {
					currentQuestion.wrong = true;
				}
				currentQuestion.attempted = true;
			}
		},
		setCurrentGameStatus: (state, action: PayloadAction<any>) => {
			const { isCorrect, isWrong } = action.payload;

			if (state.currentGame) {
				const { correct, wrong, remaining, attempted } = state.currentGame;

				if (isCorrect) {
					state.currentGame.correct = correct + 1;
				}
				if (isWrong) {
					state.currentGame.wrong = wrong + 1;
				}
				state.currentGame.remaining = remaining - 1;
				state.currentGame.attempted = attempted + 1;
			}
		},
		retakeCurrentQuiz: (state) => {
			if (state.currentGame) {
				state.currentGame.attempted = 0;
				state.currentGame.correct = 0;
				state.currentGame.wrong = 0;
				state.currentGame.remaining =
					state.currentGame.formatted_questions.length;
				state.currentGame.formatted_questions = createQuestionSet(
					state.currentGame.game_category_id,
					state.currentGame.game_difficulty_id
				);
				state.currentGame.game_status_id = 1;
			}
		},
	},
	extraReducers: (builder: ActionReducerMapBuilder<InitialStateType>) => {
		builder
			.addCase(createNewGame.pending, (state) => {
				state.loading = true;
			})
			.addCase(createNewGame.fulfilled, (state, action: PayloadAction<any>) => {
				state.loading = false;
				state.currentGame = action.payload;
			})
			.addCase(createNewGame.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false;
				state.error = action.payload || "Something went wrong";
			})
			.addCase(getGameData.pending, (state) => {
				state.loading = true;
			})
			.addCase(getGameData.fulfilled, (state, action: PayloadAction<any>) => {
				const { game_category_id, game_difficulty_id, game_status_id } =
					action.payload;
				state.loading = false;

				if (game_status_id === 1) {
					state.currentGame = {
						...action.payload,
						formatted_questions: createQuestionSet(
							game_category_id,
							game_difficulty_id
						),
					};
				} else {
					state.currentGame = {
						...action.payload,
					};
				}

				state.currentGameCategory = getCategoryName(game_category_id);
			})
			.addCase(getGameData.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false;
				state.error = action.payload || "Something went wrong";
			})
			.addCase(submitGameData.pending, (state) => {
				state.loading = true;
			})
			.addCase(
				submitGameData.fulfilled,
				(state, action: PayloadAction<any>) => {
					const {
						correct,
						wrong,
						game_point,
						game_status_id,
						attempted,
						success,
					} = action.payload;
					if (state.currentGame && success) {
						state.currentGame.correct = correct;
						state.currentGame.wrong = wrong;
						state.currentGame.remaining = 0;
						state.currentGame.attempted = attempted;
						state.currentGame.game_status_id = game_status_id;
						state.currentGame.game_point = game_point;
					}
					state.loading = false;
				}
			)
			.addCase(submitGameData.rejected, (state) => {
				state.loading = false;
			})
			.addCase(getLastPlayedQuizes.pending, (state) => {
				state.loading = true;
			})
			.addCase(
				getLastPlayedQuizes.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.loading = false;
					state.playedGameList = action.payload;
				}
			)
			.addCase(
				getLastPlayedQuizes.rejected,
				(state, action: PayloadAction<any>) => {
					state.loading = false;
					state.error = action.payload || "Something went wrong";
				}
			);
	},
});

export const {
	resetCurrentGame,
	resetCurrentGameCategory,
	setCurrentGameCategory,
	setCurrentQuestionSelectedAnswer,
	setCurrentQuestionAttempt,
	setCurrentGameStatus,
	retakeCurrentQuiz,
} = gameSlice.actions;
export default gameSlice.reducer;
