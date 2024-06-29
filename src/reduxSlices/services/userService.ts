import axios from "axios";

const API_URL = "/api/user/";

const config = {
	headers: {
		"Content-Type": "application/json",
	},
};

// Get user info
const getUserInfoById = async (user_id: string) => {
	try {
		const response = await axios.get(API_URL + `?user_id=${user_id}`, config);
		return response.data;
	} catch (error: any) {
		console.log("ERROR:", error);
		return error;
	}
};

const getAllUserWithRank = async () => {
	try {
		const response = await axios.get(API_URL + "getuserswithrank", config);
		return response.data;
	} catch (error: any) {
		console.log("ERROR:", error);
		return error;
	}
};

const getCategoryWiseScoreByUserId = async (user_id: string) => {
	try {
		const response = await axios.get(
			API_URL + "getcategorywisescorebyuserid" + `?user_id=${user_id}`,
			config
		);
		return response.data;
	} catch (error: any) {
		console.log("ERROR:", error);
		return null;
	}
};

const getDailyScoreByUserId = async (user_id: string) => {
	try {
		const response = await axios.get(
			API_URL + "getdailyscorebyuserid" + `?user_id=${user_id}`,
			config
		);
		return response.data;
	} catch (error: any) {
		console.log("ERROR:", error);
		return null;
	}
};

const getWorldRankByUserId = async (user_id: string) => {
	try {
		const response = await axios.get(
			API_URL + "getworldrankbyuserid" + `?user_id=${user_id}`,
			config
		);
		return response.data;
	} catch (error: any) {
		console.log("ERROR:", error);
		return null;
	}
};

const userService = {
	getUserInfoById,
	getAllUserWithRank,
	getCategoryWiseScoreByUserId,
	getDailyScoreByUserId,
	getWorldRankByUserId,
};

export default userService;
