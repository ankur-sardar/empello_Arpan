import db from "../config/db";

const getCategories = async (req: any, res: any) => {
	// try {
	// 	const categories = await db.query("SELECT * FROM xracademy.quiz_category");
	// 	res.status(200).json(categories.rows);
	// } catch (err: any) {
	// 	console.error(err.message);
	// 	res.status(500).send("Server error");
	// }
};

const createNewQuizGame = async (req: any, res: any) => {
	// try {
	// 	const {
	// 		game_id,
	// 		game_category_id,
	// 		game_type_id,
	// 		game_difficulty_id,
	// 		game_time_id,
	// 		game_status_id,
	// 		participant_ids,
	// 		formatted_questions,
	// 		user_id,
	// 	} = req.body;
	// 	await db.query(
	// 		"INSERT INTO xracademy.game_inprogress_meta(game_id, start_date, end_date, participant_ids, formatted_questions, game_status_id, game_type_id, game_category_id, game_difficulty_id,game_time_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9, $10)",
	// 		[
	// 			game_id,
	// 			new Date(),
	// 			new Date(),
	// 			participant_ids,
	// 			JSON.stringify(formatted_questions),
	// 			game_status_id,
	// 			game_type_id,
	// 			game_category_id,
	// 			game_difficulty_id,
	// 			game_time_id,
	// 		]
	// 	);
	// 	//Update game_inprogress_users
	// 	//id,user_id,game_meta_id,no_of_break,attempted,correct,wrong,remaining
	// 	const insertedRow = await db.query(
	// 		"INSERT INTO xracademy.game_inprogress_users(game_meta_id, user_id, no_of_break, attempted, correct, wrong, remaining, game_point) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
	// 		[game_id, user_id, 0, 0, 0, 0, formatted_questions.length, 0]
	// 	);
	// 	res.status(200).json(insertedRow.rows[0]);
	// } catch (err: any) {
	// 	console.error(err.message);
	// 	res.status(500).send("Server error");
	// }
};

export { getCategories, createNewQuizGame };
