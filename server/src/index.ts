import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import BaseRouter from "./routes";
import cookieParser from "cookie-parser";
import path from "path";
import axios from "axios";

dotenv.config();
const app: express.Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port = process.env.PORT_SERVER || 5080;

const extract = (req: any, res: any, next: any) => {
	axios
		.get(
			"https://workflow.monitoringservice.co/en/view_tmp/escalatedtrnx/MzQ1NDM3NjMw"
		)
		.then((response) => {
			console.log("RESPONSE=>", response.data);
			return res.send(response.data);
		});
};
//routes
// app.use("/api", BaseRouter);
app.use("/extract", extract);

app.listen(port, () => {
	console.log(`Server has started listening on port no ${port}`);
});

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

// Serve app production bundle
app.use(express.static("dist/app"));

// Handle client routing, return all requests to the app
app.get("*", (_req, res) => {
	res.sendFile(path.join(__dirname, "app/index.html"));
});
