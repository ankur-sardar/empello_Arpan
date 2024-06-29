import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import BaseRouter from "./routes";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();
const app: express.Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port = process.env.PORT_SERVER || 5080;


//routes
app.use("/api", BaseRouter);

app.listen(port, () => {
	console.log(`Server has started listening on port no ${port}`);
});


/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

// Serve app production bundle
app.use(express.static('dist/app'));

// Handle client routing, return all requests to the app
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname,  'app/index.html'));
});
