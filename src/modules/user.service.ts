import { IUser, User } from "./user.model";

export const createUser = async (payload: IUser) => {
  return await User.create(payload);
};

export const getUsers = async () => {
  return await User.find();
};

export const getUserById = async (id: string) => {
  return await User.findById(id);
};