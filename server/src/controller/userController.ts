import db from "../config/db";

const getUserInfoById = async (req: any, res: any) => {
	try {
		const user_id = req.query.user_id;

		const userInfo = await db.query(
			`SELECT  * FROM xracademy.user_profile WHERE user_id='${user_id}'`
		);
		if (userInfo.rows.length > 0) {
			return res.status(200).json(userInfo.rows[0]);
		} else {
			await db.query(
				"INSERT INTO xracademy.identity (user_id, email, password, role_id, active) VALUES ($1, $2, $3, $4, $5)",
				[user_id, "", "", 1, true]
			);

			await db.query(
				"INSERT INTO xracademy.user_profile (user_id, first_name, last_name) VALUES ($1, $2, $3)",
				[user_id, "Guest", "User"]
			);

			const userInfo_new = await db.query(
				`SELECT  * FROM xracademy.user_profile WHERE user_id='${user_id}'`
			);

			return res.status(200).json(userInfo_new.rows[0]);
		}
	} catch (err: any) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};

const getUsersWithRank = async (req: any, res: any) => {
	try {
		const users = await db.query(
			`SELECT  * FROM xracademy.user_profile ORDER BY user_points DESC`
		);
		if (users.rows.length > 0) {
			const userData = users.rows.map((user: any, index: number) => {
				return {
					...user,
					rank: index + 1,
				};
			});
			return res.status(200).json(userData);
		} else {
			return res.status(500).json({ message: "No user found" });
		}
	} catch (err: any) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};

const getCategoryWiseScoreByUserId = async (req: any, res: any) => {
	try {
		const user_id = req.query.user_id || "";

		const userInfo = await db.query(
			`SELECT GM.game_category_id, SUM(GU.game_point) AS total_game_points
				FROM xracademy.game_inprogress_meta AS GM
				JOIN xracademy.game_inprogress_users AS GU ON GU.game_meta_id = GM.game_id
				WHERE GU.user_id = '${user_id}'
				AND GM.game_status_id = 2
				GROUP BY GM.game_category_id`
		);
		return res.status(200).json(userInfo.rows);
	} catch (err: any) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};

const getDailyScoreByUserId = async (req: any, res: any) => {
	try {
		const user_id = req.query.user_id || "";

		const userInfo = await db.query(
			`SELECT EXTRACT(DOW FROM GM.end_date) AS day_of_week, GU.game_point
				FROM xracademy.game_inprogress_meta AS GM
				JOIN xracademy.game_inprogress_users AS GU ON GU.game_meta_id = GM.game_id
				WHERE GU.user_id = '${user_id}'
				AND GM.game_status_id = 2
				AND GM.end_date >= DATE_TRUNC('week', CURRENT_DATE)
				  AND GM.end_date < DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '1 week';`
		);
		return res.status(200).json(userInfo.rows);
	} catch (err: any) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};

const getWorldRankByUserId = async (req: any, res: any) => {
	try {
		const user_id = req.query.user_id || "";

		const userInfo = await db.query(
			`SELECT * FROM (SELECT
				user_id,user_points,
				ROW_NUMBER() OVER (ORDER BY user_points DESC) AS rank
				FROM
					xracademy.user_profile) AS ranked_users
				WHERE
					user_id = '${user_id}'`
		);
		return res.status(200).json(userInfo.rows);
	} catch (err: any) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};

export {
	getUserInfoById,
	getUsersWithRank,
	getCategoryWiseScoreByUserId,
	getDailyScoreByUserId,
	getWorldRankByUserId,
};
