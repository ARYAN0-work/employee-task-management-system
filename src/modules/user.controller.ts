import { Request, Response } from "express";
import * as userService from "./user.service";

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await userService.getUsers();

  res.status(200).json({
    success: true,
    data: users,
  });
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.id as string);

  res.status(200).json({
    success: true,
    data: user,
  });
};