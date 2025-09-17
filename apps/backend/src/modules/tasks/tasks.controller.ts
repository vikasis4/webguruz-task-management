import { Request } from "express";
import { ResponseObject } from "@/middlewares/catchAsync.middleware";
import { Task } from "@/models/task.model";
import { logger } from "@/utils/logger";
import ITaskDto from "@repo/dto/tasks";

class TaskController {
  static async getTasks(req: Request): Promise<ResponseObject> {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const isAdmin = req.user?.role === "admin";

    const tasks = await Task.find({
      ...(isAdmin ? {} : { createdBy: req.user?.userId }),
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    const totalTasks = await Task.countDocuments({
      ...(isAdmin ? {} : { createdBy: req.user?.userId }),
    });
    const totalPages = Math.ceil(totalTasks / limit);

    return {
      status: 200,
      data: { tasks, totalPages, page, limit, totalTasks },
      message: "Fetched tasks successful",
    };
  }

  static async updateStatus(req: Request): Promise<ResponseObject> {
    const payload = req.body as ITaskDto["update"]["req"];
    const tasks = await Task.updateMany(
      { _id: { $in: payload.taskIds } },
      { status: payload.status }
    );
    return {
      status: 200,
      data: tasks,
      message: "Updated status successful",
    };
  }
}

export default TaskController;
