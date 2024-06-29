"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfoById = void 0;
const tslib_1 = require("tslib");
const db_1 = tslib_1.__importDefault(require("../config/db"));
const getUserInfoById = async (req, res) => {
    try {
        const user_id = req.query.user_id;
        const userInfo = await db_1.default.query(`SELECT  * FROM xracademy.user_profile WHERE user_id='${user_id}'`);
        userInfo.rows.length > 0
            ? res.status(200).json(userInfo.rows[0])
            : res.status(500).send("No user found");
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
exports.getUserInfoById = getUserInfoById;
