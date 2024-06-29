import db from "../config/db";

const getCategories = async (req: any, res: any) => {
	try {
		const categories = await db.query("SELECT * FROM xracademy.quiz_category");
		res.status(200).json(categories.rows);
	} catch (err: any) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};

const getQuizLevels = async (req: any, res: any) => {
	try {
		const levels = await db.query("SELECT * FROM xracademy.quiz_level");
		res.status(200).json(levels.rows);
	} catch (err: any) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};

const createNewQuizGame = async (req: any, res: any) => {
	try {
		const {
			game_id,
			game_category_id,
			game_type_id,
			game_difficulty_id,
			game_time_id,
			game_status_id,
			participant_ids,
			formatted_questions,
			user_id,
		} = req.body;

		await db.query(
			"INSERT INTO xracademy.game_inprogress_meta(game_id, start_date, end_date, participant_ids, formatted_questions, game_status_id, game_type_id, game_category_id, game_difficulty_id,game_time_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9, $10)",
			[
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
			]
		);
		//Update game_inprogress_users
		//id,user_id,game_meta_id,no_of_break,attempted,correct,wrong,remaining
		const insertedRow = await db.query(
			"INSERT INTO xracademy.game_inprogress_users(game_meta_id, user_id, no_of_break, attempted, correct, wrong, remaining, game_point) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
			[game_id, user_id, 0, 0, 0, 0, formatted_questions.length, 0]
		);

		// const game_inprogress_users_id = insertedRow.rows[0].id

		// await db.query(
		// 	"UPDATE game_inprogress_meta SET game_inprogress_users_id=$1 WHERE ",
		// 	[
		// 		game_inprogress_users_id
		// 	]
		// );

		res.status(200).json(insertedRow.rows[0]);
	} catch (err: any) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};

const submitCompletedGameData = async (req: any, res: any) => {
	try {
		// console.log("submitCompletedGameData====>", req.body);
		const {
			// game_id,
			// start_date,
			// end_date,
			formatted_questions,
			game_status_id,
			game_meta_id,
			// game_inprogress_users_id,
			user_id,
			attempted,
			correct,
			wrong,
			remaining,
			// id,
			game_point,
		} = req.body;

		//Update game_inprogress_meta

		await db.query(
			"UPDATE xracademy.game_inprogress_meta SET end_date=$1, formatted_questions=$2, game_status_id=$3 WHERE game_id=$4",
			[
				new Date(),
				JSON.stringify(formatted_questions),
				game_status_id,
				game_meta_id,
			]
		);

		//Update game_inprogress_users

		await db.query(
			"UPDATE xracademy.game_inprogress_users SET no_of_break=$1, attempted=$2, correct=$3, wrong=$4, remaining=$5, game_point=$6 WHERE game_meta_id=$7 AND user_id=$8",
			[
				0,
				attempted,
				correct,
				wrong,
				remaining,
				game_point,
				game_meta_id,
				user_id,
			]
		);

		const userData = await db.query(
			"SELECT * FROM xracademy.user_profile WHERE user_id=$1",
			[user_id]
		);
		const { user_points } = userData.rows[0];
		const updatedUserPoints = user_points + game_point;

		await db.query(
			"UPDATE xracademy.user_profile SET user_points=$1 WHERE user_id=$2",
			[updatedUserPoints, user_id]
		);

		res.status(200).json({
			success: true,
			message: "Game data submitted successfully.",
			game_point,
		});
	} catch (err: any) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};

const getGameDataById = async (req: any, res: any) => {
	try {
		const { gameId, userId } = req.query;

		const gameMetaDta = await db.query(
			"SELECT * FROM xracademy.game_inprogress_meta WHERE game_id=$1",
			[gameId]
		);
		const participant_ids = gameMetaDta.rows[0].participant_ids;

		if (participant_ids.includes(userId)) {
			const gameUserDta = await db.query(
				"SELECT * FROM xracademy.game_inprogress_users WHERE user_id=$1 AND game_meta_id=$2",
				[userId, gameId]
			);

			const { id } = gameUserDta.rows[0];

			const dataToReturn = {
				...gameMetaDta.rows[0],
				game_inprogress_users_id: id,
				...gameUserDta.rows[0],
			};

			res.status(200).json(dataToReturn);
		} else {
			res.status(500).send("You do not have permission.");
		}
	} catch (err: any) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};

const getPlayedQuizGames = async (req: any, res: any) => {
	try {
		const { userId } = req.query;

		const playedGames = await db.query(
			"SELECT giu.user_id,giu.game_point,gim.game_id,gim.end_date,gim.game_category_id" +
				" FROM xracademy.game_inprogress_users giu, xracademy.game_inprogress_meta gim" +
				" WHERE giu.user_id=$1" +
				" AND giu.game_meta_id=gim.game_id AND gim.game_status_id=2 AND gim.game_type_id=1" +
				" ORDER BY gim.end_date DESC",
			[userId]
		);

		res.status(200).json({ playedgames: [...playedGames.rows] });
	} catch (err: any) {
		console.log(err);
		res.status(500).send("Server error");
	}
};
export {
	getCategories,
	getQuizLevels,
	createNewQuizGame,
	submitCompletedGameData,
	getGameDataById,
	getPlayedQuizGames,
};
