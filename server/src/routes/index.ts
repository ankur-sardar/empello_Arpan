import { Router } from "express";
import UserRoutes from "./userRoutes";
import AuthRoutes from "./auth";
import QuizRoutes from "./quizRoutes";
const router = Router();

// Routes
router.use("/user", UserRoutes);
router.use("/quiz", QuizRoutes);
router.use("/auth", AuthRoutes);

// Export the base-router
export default router;
