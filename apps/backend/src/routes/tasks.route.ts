import { authorize } from "@/middlewares/auth.middleware";
import { catchAsync } from "@/middlewares/catchAsync.middleware";
import TaskController from "@/modules/tasks/tasks.controller";
import Express from "express";

const router = Express.Router();

export const routeName = "tasks";

router.get("/", authorize, catchAsync(TaskController.getTasks));
router.put("/status", authorize, catchAsync(TaskController.updateStatus));

export default router;
