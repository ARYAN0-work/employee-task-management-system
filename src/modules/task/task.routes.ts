import { Router } from "express";
import * as taskController from "./task.controller";

const router = Router();

router.post("/", taskController.createTask);

router.get("/", taskController.getTasks);

router.get("/:id", taskController.getTaskById);

router.patch("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

export default router;