import axios from "axios";
const API_URL = "/api/empelloServices/";
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
const extractEmpelloTicketData = async (urlList: string[]) => {
	const response = await axios.post(API_URL + "createTicketData", { urlList });
	return response.data;
};

const empelloService = {
	extractEmpelloTicketData,
};

export default empelloService;
