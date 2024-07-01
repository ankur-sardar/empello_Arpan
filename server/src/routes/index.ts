import { Router } from "express";
import UserRoutes from "./userRoutes";
import QuizRoutes from "./quizRoutes";
const router = Router();

// Routes
router.use("/user", UserRoutes);
router.use("/quiz", QuizRoutes);

// Export the base-router
export default router;
