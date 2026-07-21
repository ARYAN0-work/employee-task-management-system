import { ITask, Task } from "./task.model";

export const createTask = async (payload: ITask) => {
  return await Task.create(payload);
};

export const getTasks = async () => {
  return await Task.find()
    .populate("assignedTo")
    .populate("createdBy");
};

export const getTaskById = async (id: string) => {
  return await Task.findById(id)
    .populate("assignedTo")
    .populate("createdBy");
};

export const updateTask = async (
  id: string,
  payload: Partial<ITask>
) => {
  return await Task.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

export const deleteTask = async (id: string) => {
  return await Task.findByIdAndDelete(id);
};