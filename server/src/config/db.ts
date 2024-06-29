import { Pool } from "pg";

// const db = new Pool({
// 	user: "postgres",
// 	password: "iitmandi",
// 	host: "localhost",
// 	port: 5432,
// 	database: "xracademy-quiz",
// });

const db = new Pool({
	user: "pratap",
	password: "stophlkiboXlbRagic7t",
	host: "hawkeye-database.sam-media.com",
	port: 5432,
	database: "products",
});

export default db;
