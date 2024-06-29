"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const db_1 = tslib_1.__importDefault(require("../config/db"));
const validInfo_1 = tslib_1.__importDefault(require("../middleware/validInfo"));
const uuid_1 = require("uuid");
const router = express_1.default.Router();
router.post("/register", validInfo_1.default, async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        const user = await db_1.default.query("SELECT * FROM xracademy.identity WHERE email = $1", [email]);
        if (user.rows.length > 0) {
            return res.status(401).json("User already exist!");
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const bcryptPassword = await bcrypt_1.default.hash(password, salt);
        const newUserId = (0, uuid_1.v4)();
        await db_1.default.query("INSERT INTO xracademy.identity (user_id, email, password, role_id, active) VALUES ($1, $2, $3, $4, $5)", [newUserId, email, bcryptPassword, 1, true]);
        await db_1.default.query("INSERT INTO xracademy.user_profile (user_id, first_name, last_name) VALUES ($1, $2, $3)", [newUserId, firstName, lastName]);
        return res.json({
            user_id: newUserId,
            userName: firstName + "" + lastName,
            userEmail: email,
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
exports.default = router;
