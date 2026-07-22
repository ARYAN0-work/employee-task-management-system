import { IUser, User } from "./user.model"
import { AppError } from "../../errors/AppError";

export const createUser = async (payload: IUser) => {
  const existingUser = await User.findOne({
    email: payload.email,
  });

  if (existingUser) {
    throw new AppError(409, "Email is already registered.");
  }

  return await User.create(payload);
};

export const getUsers = async () => {
  return await User.find();
};

export const getUserById = async (id: string) => {
  return await User.findById(id);
};