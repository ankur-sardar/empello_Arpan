import axios from "axios";
import type { newGameRequestDataType } from "../../dataTypes";
const API_URL = "/api/quiz/";
const config = {
	headers: {
		"Content-Type": "application/json",
	},
};

// Get quiz categories
const getQuizCategories = async () => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const response = await axios.get(API_URL + "categories", config);

	return response.data;
};

// Get quiz levels
const getQuizLevels = async () => {
	const response = await axios.get(API_URL + "quizlevels", config);

	return response.data;
};

//Create new quiz game
const createNewQuizGame = async (newGameData: newGameRequestDataType) => {
	const response = await axios.post(API_URL + "createnewgame", newGameData);
	return response.data;
};

//Get game data
const getGameDataById = async (gameId: string, userId: string) => {
	const response = await axios.get(
		API_URL + `getgamedatabyid?gameId=${gameId}&userId=${userId}`,
		config
	);
	return response.data;
};

//Set played game data
const submitGameData = async (gameData: any) => {
	const response = await axios.post(API_URL + "submitgamedata", gameData);
	return response.data;
};

const getPlayedQuizGames = async (userId: string) => {
	try {
		const response = await axios.get(
			API_URL + `getplayedgames?userId=${userId}`,
			config
		);
		return response.data.playedgames;
	} catch (err) {
		console.log("ERROR:", err);
		return null;
	}
};

const quizService = {
	getQuizCategories,
	getQuizLevels,
	createNewQuizGame,
	getGameDataById,
	submitGameData,
	getPlayedQuizGames,
};

export default quizService;
