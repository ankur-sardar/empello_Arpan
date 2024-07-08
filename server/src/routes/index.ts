import { Router } from "express";
import EmpelloRoutes from "./empelloRoutes";
const router = Router();

// Routes
router.use("/empelloServices", EmpelloRoutes);

// Export the base-router
export default router;
