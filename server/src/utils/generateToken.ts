import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (res: any, userId: any) => {
	const payload = {
		user: {
			id: userId,
		},
	};

	// const token = jwt.sign(payload, process.env.JWT_SECRETE, {
	// 	expiresIn: "30d",
	// });

	const token = "";

	res.cookie("jwt", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: "strict",
		maxAge: 30 * 24 * 60 * 60 * 1000,
	});
};

export default generateToken;
