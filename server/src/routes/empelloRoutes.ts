import express from "express";
// import authorize from "../middleware/authorize";
import { createTicketData } from "../controller/empelloController";
const router = express.Router();

// router.get("/getTicketDataByDate", authorize, getTicketData);
router.post("/createTicketData", createTicketData);

export default router;
