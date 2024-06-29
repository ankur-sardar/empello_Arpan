"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayedQuizGames = exports.getGameDataById = exports.submitCompletedGameData = exports.createNewQuizGame = exports.getQuizLevels = exports.getCategories = void 0;
const tslib_1 = require("tslib");
const db_1 = tslib_1.__importDefault(require("../config/db"));
const getCategories = async (req, res) => {
    try {
        const categories = await db_1.default.query("SELECT * FROM xracademy.quiz_category");
        res.status(200).json(categories.rows);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
exports.getCategories = getCategories;
const getQuizLevels = async (req, res) => {
    try {
        const levels = await db_1.default.query("SELECT * FROM xracademy.quiz_level");
        res.status(200).json(levels.rows);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
exports.getQuizLevels = getQuizLevels;
const createNewQuizGame = async (req, res) => {
    try {
        const { game_id, game_category_id, game_type_id, game_difficulty_id, game_time_id, game_status_id, participant_ids, formatted_questions, user_id, } = req.body;
        await db_1.default.query("INSERT INTO xracademy.game_inprogress_meta(game_id, start_date, end_date, participant_ids, formatted_questions, game_status_id, game_type_id, game_category_id, game_difficulty_id,game_time_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9, $10)", [
            game_id,
            new Date(),
            new Date(),
            participant_ids,
            JSON.stringify(formatted_questions),
            game_status_id,
            game_type_id,
            game_category_id,
            game_difficulty_id,
            game_time_id,
        ]);
        const insertedRow = await db_1.default.query("INSERT INTO xracademy.game_inprogress_users(game_meta_id, user_id, no_of_break, attempted, correct, wrong, remaining, game_point) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *", [game_id, user_id, 0, 0, 0, 0, formatted_questions.length, 0]);
        res.status(200).json(insertedRow.rows[0]);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
exports.createNewQuizGame = createNewQuizGame;
const submitCompletedGameData = async (req, res) => {
    try {
        const { formatted_questions, game_status_id, game_meta_id, user_id, attempted, correct, wrong, remaining, game_point, } = req.body;
        await db_1.default.query("UPDATE xracademy.game_inprogress_meta SET end_date=$1, formatted_questions=$2, game_status_id=$3 WHERE game_id=$4", [
            new Date(),
            JSON.stringify(formatted_questions),
            game_status_id,
            game_meta_id,
        ]);
        await db_1.default.query("UPDATE xracademy.game_inprogress_users SET no_of_break=$1, attempted=$2, correct=$3, wrong=$4, remaining=$5, game_point=$6 WHERE game_meta_id=$7 AND user_id=$8", [
            0,
            attempted,
            correct,
            wrong,
            remaining,
            game_point,
            game_meta_id,
            user_id,
        ]);
        const userData = await db_1.default.query("SELECT * FROM xracademy.user_profile WHERE user_id=$1", [user_id]);
        const { user_points } = userData.rows[0];
        const updatedUserPoints = user_points + game_point;
        await db_1.default.query("UPDATE xracademy.user_profile SET user_points=$1 WHERE user_id=$2", [updatedUserPoints, user_id]);
        res.status(200).json({
            success: true,
            message: "Game data submitted successfully.",
            game_point,
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
exports.submitCompletedGameData = submitCompletedGameData;
const getGameDataById = async (req, res) => {
    try {
        const { gameId, userId } = req.query;
        const gameMetaDta = await db_1.default.query("SELECT * FROM xracademy.game_inprogress_meta WHERE game_id=$1", [gameId]);
        const participant_ids = gameMetaDta.rows[0].participant_ids;
        if (participant_ids.includes(userId)) {
            const gameUserDta = await db_1.default.query("SELECT * FROM xracademy.game_inprogress_users WHERE user_id=$1 AND game_meta_id=$2", [userId, gameId]);
            const { id } = gameUserDta.rows[0];
            const dataToReturn = Object.assign(Object.assign(Object.assign({}, gameMetaDta.rows[0]), { game_inprogress_users_id: id }), gameUserDta.rows[0]);
            res.status(200).json(dataToReturn);
        }
        else {
            res.status(500).send("You do not have permission.");
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
exports.getGameDataById = getGameDataById;
const getPlayedQuizGames = async (req, res) => {
    try {
        const { userId } = req.query;
        const playedGames = await db_1.default.query("SELECT giu.user_id,giu.game_point,gim.game_id,gim.end_date,gim.game_category_id" +
            " FROM xracademy.game_inprogress_users giu, xracademy.game_inprogress_meta gim" +
            " WHERE giu.user_id=$1" +
            " AND giu.game_meta_id=gim.game_id AND gim.game_status_id=2 AND gim.game_type_id=1" +
            " ORDER BY gim.end_date DESC", [userId]);
        res.status(200).json({ playedgames: [...playedGames.rows] });
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
};
exports.getPlayedQuizGames = getPlayedQuizGames;
