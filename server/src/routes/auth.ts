import express from "express";

import bcrypt from "bcrypt";
import pool from "../config/db";
import validInfo from "../middleware/validInfo";
// const jwtGenerator = require("../utils/generateToken");
// const authorize = require("../middleware/authorize");
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

//authorizeentication

router.post("/register", validInfo, async (req, res) => {
	const { email, password, firstName, lastName } = req.body;
	try {
		const user = await pool.query(
			"SELECT * FROM xracademy.identity WHERE email = $1",
			[email]
		);

		if (user.rows.length > 0) {
			return res.status(401).json("User already exist!");
		}

		const salt = await bcrypt.genSalt(10);
		const bcryptPassword = await bcrypt.hash(password, salt);

		const newUserId = uuidv4();

		await pool.query(
			"INSERT INTO xracademy.identity (user_id, email, password, role_id, active) VALUES ($1, $2, $3, $4, $5)",
			[newUserId, email, bcryptPassword, 1, true]
		);

		await pool.query(
			"INSERT INTO xracademy.user_profile (user_id, first_name, last_name) VALUES ($1, $2, $3)",
			[newUserId, firstName, lastName]
		);

		// const jwtToken = jwtGenerator(newUser.rows[0].user_id);

		return res.json({
			user_id: newUserId,
			userName: firstName + "" + lastName,
			userEmail: email,
			// jwtToken,
		});
	} catch (err: any) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

// router.post("/login", validInfo, async (req, res) => {
// 	const { email, password } = req.body;

// 	try {
// 		const user = await pool.query("SELECT * FROM identity WHERE email = $1", [
// 			email,
// 		]);

// 		if (user.rows.length === 0) {
// 			return res.status(401).json("Invalid Credential");
// 		}

// 		const validPassword = await bcrypt.compare(password, user.rows[0].password);

// 		if (!validPassword) {
// 			return res.status(401).json("Invalid Credential");
// 		}

// 		const userId = user.rows[0].user_id;
// 		const jwtToken = jwtGenerator(userId);
// 		const profileDetails = await pool.query(
// 			"SELECT * FROM user_profile WHERE user_id = $1",
// 			[userId]
// 		);
// 		const { first_name, last_name, user_name } = profileDetails.rows[0];

// 		return res.json({
// 			name: first_name + " " + last_name,
// 			email,
// 			jwtToken,
// 		});
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send("Server error");
// 	}
// });

// router.post("/verify", authorize, (req, res) => {
// 	try {
// 		res.json(true);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send("Server error");
// 	}
// });

export default router;
