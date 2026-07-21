import { Router } from "express";
import { getHealth } from "../controllers/health.controller.js";
import userRoutes from "../modules/user/user.routes.js"


const router = Router();

router.get("/",getHealth)
router.use("/users", userRoutes);

export default router;