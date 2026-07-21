import { ITask, Task } from "./task.model";
import { User } from "../user/user.model";

export const createTask = async (payload: ITask) => {
  
  const employee = await User.findById(payload.assignedTo);

  if (!employee) {
    throw new Error("Employee not found");
  }

  if (employee.role !== "employee") {
    throw new Error("Task can only be assigned to an employee");
  }

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
  taskId: string,
  managerId: string,
  payload: Partial<ITask>
) => {
  const task = await Task.findOne({
    _id: taskId,
    createdBy: managerId,
  });

  if (!task) {
    throw new Error("Task not found or unauthorized");
  }

  Object.assign(task, payload);

  return await task.save();
};

export const deleteTask = async (
  taskId: string,
  managerId: string
) => {
  const task = await Task.findOneAndDelete({
    _id: taskId,
    createdBy: managerId,
  });

  if (!task) {
    throw new Error("Task not found or unauthorized");
  }

  return task;
};