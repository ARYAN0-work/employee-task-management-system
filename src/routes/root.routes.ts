import { Router } from "express";
import { getHealth } from "../controllers/health.controller.js";
import userRoutes from "../modules/user/user.routes.js";
import taskRoutes from "../modules/task/task.routes.js";

const router = Router();

router.get("/health", getHealth);

router.use("/api/v1/users", userRoutes);
router.use("/api/v1/tasks", taskRoutes);

export default router;
