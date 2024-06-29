import express from "express";
import authorize from "../middleware/authorize";
import {
	getCategories,
	getQuizLevels,
	createNewQuizGame,
	submitCompletedGameData,
	getGameDataById,
	getPlayedQuizGames,
} from "../controller/quizController";
const router = express.Router();

router.get("/categories", authorize, getCategories);
router.get("/quizlevels", authorize, getQuizLevels);
router.post("/createnewgame", authorize, createNewQuizGame);
router.post("/submitgamedata", authorize, submitCompletedGameData);
router.get("/getgamedatabyid", authorize, getGameDataById);
router.get("/getplayedgames", authorize, getPlayedQuizGames);

export default router;
