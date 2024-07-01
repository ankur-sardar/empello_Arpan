import axios from "axios";
const API_URL = "/api/quiz/";
const config = {
	headers: {
		"Content-Type": "application/json",
	},
};

// Get quiz categories
// const getQuizCategories = async () => {
// 	const config = {
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	};

// 	const response = await axios.get(API_URL + "categories", config);

// 	return response.data;
// };

//Create new quiz game
const createNewQuizGame = async (newGameData: any) => {
	const response = await axios.post(API_URL + "createnewgame", newGameData);
	return response.data;
};

const quizService = {
	createNewQuizGame,
};

export default quizService;
