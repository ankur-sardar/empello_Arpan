import express from "express";
import authorize from "../middleware/authorize";
import {
	getUserInfoById,
	getUsersWithRank,
	getCategoryWiseScoreByUserId,
	getDailyScoreByUserId,
	getWorldRankByUserId,
} from "../controller/userController";
const router = express.Router();

// @desc    Get user info
// @route   GET /api/user/?user_id=xxx
// @access  Private
router.get("/", authorize, getUserInfoById);

// @desc    Get users with rank
// @route   GET /api/user/getuserswithrank
// @access  Private
router.get("/getuserswithrank", authorize, getUsersWithRank);

// @desc    Get user points by category
// @route   GET /api/user/getcategorywisescorebyuserid/?user_id=xxx
// @access  Private
router.get(
	"/getcategorywisescorebyuserid",
	authorize,
	getCategoryWiseScoreByUserId
);

// @desc    Get daily user points for current week
// @route   GET /api/user/getdailyscorebyuserid/?user_id=xxx
// @access  Private
router.get("/getdailyscorebyuserid", authorize, getDailyScoreByUserId);

// @desc    Get daily user points for current week
// @route   GET /api/user/getworldrankbyuserid/?user_id=xxx
// @access  Private
router.get("/getworldrankbyuserid", authorize, getWorldRankByUserId);
export default router;
