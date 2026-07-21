import { Router } from "express";
import { getHealth } from "../controllers/health.controller.js";
import userRoutes from "../modules/user/user.routes.js"
import taskRoutes from "../modules/task/task.routes";

const router = Router();

router.get("/",getHealth)
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);



export default router;