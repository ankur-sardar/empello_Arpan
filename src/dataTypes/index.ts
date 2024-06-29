import store from "../store";

export type quizCategoryType = {
	id: number;
	category_name: string;
	logo_name: string;
	description: string;
};
export type quizLevelType = {
	id: number;
	name: string;
	points_per_star: number;
	eligible_for_coin_exchange: boolean;
	logo_name: string;
	completion_point: number;
};
export type newGameRequestDataType = {
	game_id: string;
	game_category_id: number;
	game_type_id: number;
	game_difficulty_id: number;
	game_time_id: number;
	game_status_id: number;
	formatted_questions: any;
	participant_ids: string[];
	user_id: string;
};

export type questionFormatType = {
	question: string;
	categoryId: number;
	subCategoryId: number;
	branchId: number;
	threeDModelId?: string;
	vrVideoId?: string;
	options: {};
	correct: boolean;
	explanation: string;
	attempted: boolean;
	wrong: boolean;
	selectedOption: string;
	questionId: number;
};

export type newGameResponsetDataType = {
	game_id: string;
	start_date: Date;
	end_date: Date;
	participant_ids: string[];
	formatted_questions: questionFormatType[];
	game_status_id: number;
	game_type_id: number;
	game_category_id: number;
	game_difficulty_id: number;
	game_time_id: number;
	game_inprogress_users_id: string;
	game_meta_id: string;
	user_id: string;
	no_of_break: number;
	attempted: number;
	correct: number;
	wrong: number;
	remaining: number;
	id: string;
	game_point: number;
};

export type rootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
