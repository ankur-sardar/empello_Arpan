import express from "express";
import authorize from "../middleware/authorize";
import { getCategories, createNewQuizGame } from "../controller/quizController";
const router = express.Router();

router.get("/categories", authorize, getCategories);
router.post("/createnewgame", authorize, createNewQuizGame);

export default router;
