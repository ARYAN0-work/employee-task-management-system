import { ITask, Task } from "./task.model.js";
import { User } from "../user/user.model.js";
import { AppError } from "../../errors/AppError.js";

export const createTask = async (payload: ITask) => {
  const employee = await User.findById(payload.assignedTo);

  if (!employee) {
    throw new AppError(404, "Employee not found");
  }

  if (employee.role !== "employee") {
    throw new AppError(400, "Task can only be assigned to an employee");
  }

  return await Task.create(payload);
};

export const getTasks = async (query: {
  status?: string;
  priority?: string;
  assignedTo?: string;
  createdBy?: string;
  search?: string;
  page?: string;
  limit?: string;
}) => {
  const filter: Record<string, unknown> = {};

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

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

  if (query.search) {
    filter.$or = [
      {
        title: {
          $regex: query.search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: query.search,
          $options: "i",
        },
      },
    ];
  }

  const total = await Task.countDocuments(filter);

  const tasks = await Task.find(filter)
    .populate("assignedTo")
    .populate("createdBy")
    .skip(skip)
    .limit(limit);

  return {
    tasks,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

export const getTaskById = async (id: string) => {
  return await Task.findById(id).populate("assignedTo").populate("createdBy");
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
    throw new AppError(403, "Task not found or unauthorized");
  }

  Object.assign(task, payload);

  return await task.save();
};

export const deleteTask = async (taskId: string, managerId: string) => {
  const task = await Task.findOneAndDelete({
    _id: taskId,
    createdBy: managerId,
  });

  if (!task) {
    throw new AppError(403, "Task not found or unauthorized");
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
    throw new AppError(403, "Task not found or unauthorized");
  }

  task.status = status;

  return await task.save();
};
