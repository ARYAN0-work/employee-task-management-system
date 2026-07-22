import { Router } from "express";
import * as taskController from "./task.controller.js";

const router = Router();

router.post("/", taskController.createTask);

router.get("/", taskController.getTasks);

router.get("/:id", taskController.getTaskById);

router.patch("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

router.patch("/:id/status", taskController.updateTaskStatus);

export default router;
