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

export const getTasks = async (query: {
  status?: string;
  priority?: string;
  assignedTo?: string;
  createdBy?: string;
}) => {
  const filter: Record<string, unknown> = {};

  if (query.status) {
    filter.status = query.status;
  }

  if (query.priority) {
    filter.priority = query.priority;
  }

  if (query.assignedTo) {
    filter.assignedTo = query.assignedTo;
  }

  if (query.createdBy) {
    filter.createdBy = query.createdBy;
  }

  return await Task.find(filter)
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

export const updateTaskStatus = async (
  taskId: string,
  employeeId: string,
  status: ITask["status"]
) => {
  const task = await Task.findOne({
    _id: taskId,
    assignedTo: employeeId,
  });

  if (!task) {
    throw new Error("Task not found or unauthorized");
  }

  task.status = status;

  return await task.save();
};