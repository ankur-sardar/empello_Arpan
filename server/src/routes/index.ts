import { Router } from "express";
import QuizRoutes from "./quizRoutes";
const router = Router();

// Routes
router.use("/quiz", QuizRoutes);

// Export the base-router
export default router;
