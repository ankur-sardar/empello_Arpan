"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const authorize_1 = tslib_1.__importDefault(require("../middleware/authorize"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
router.get("/", authorize_1.default, userController_1.getUserInfoById);
exports.default = router;
