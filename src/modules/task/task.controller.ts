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
  const tasks = await taskService.getTasks({
    status: _req.query.status as string,
    priority: _req.query.priority as string,
    assignedTo: _req.query.assignedTo as string,
    createdBy: _req.query.createdBy as string,
  });

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
  const { managerId, ...payload } = req.body;

  const task = await taskService.updateTask(
    req.params.id as string,
    managerId,
    payload
  );

  res.status(200).json({
    success: true,
    data: task,
  });
};

export const deleteTask = async (req: Request, res: Response) => {
  const { managerId } = req.body;

  await taskService.deleteTask(
    req.params.id as string,
    managerId
  );

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
};

export const updateTaskStatus = async (
  req: Request,
  res: Response
) => {
  const { employeeId, status } = req.body;

  const task = await taskService.updateTaskStatus(
    req.params.id as string,
    employeeId,
    status
  );

  res.status(200).json({
    success: true,
    data: task,
  });
};