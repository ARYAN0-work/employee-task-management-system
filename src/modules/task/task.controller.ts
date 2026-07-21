import { Request, Response } from "express";
import * as taskService from "./task.service";

export const createTask = async (req: Request, res: Response) => {
  const task = await taskService.createTask(req.body);

  res.status(201).json({
    success: true,
    data: task,
  });
};

export const getTasks = async (_req: Request, res: Response) => {
  const tasks = await taskService.getTasks();

  res.status(200).json({
    success: true,
    data: tasks,
  });
};

export const getTaskById = async (req: Request, res: Response) => {
  const task = await taskService.getTaskById(req.params.id as string);

  res.status(200).json({
    success: true,
    data: task,
  });
};

export const updateTask = async (req: Request, res: Response) => {
  const task = await taskService.updateTask(
    req.params.id as string,
    req.body
  );

  res.status(200).json({
    success: true,
    data: task,
  });
};

export const deleteTask = async (req: Request, res: Response) => {
  await taskService.deleteTask(req.params.id as string);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
};