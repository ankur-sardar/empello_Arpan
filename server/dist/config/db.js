"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const db = new pg_1.Pool({
    user: "pratap",
    password: "stophlkiboXlbRagic7t",
    host: "hawkeye-database.sam-media.com",
    port: 5432,
    database: "products",
});
exports.default = db;
