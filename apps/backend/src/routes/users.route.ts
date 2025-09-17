import { authorize } from "@/middlewares/auth.middleware";
import { catchAsync } from "@/middlewares/catchAsync.middleware";
import requireRole from "@/middlewares/requireRole.middleware";
import UserController from "@/modules/users/user.controller";
import userValidator from "@/modules/users/user.validation";
import Express from "express";

const router = Express.Router();

export const routeName = "users";

router.get(
  "/",
  authorize,
  requireRole("admin"),
  catchAsync(UserController.getUsers)
);
router.put(
  "/status",
  authorize,
  requireRole("admin"),
  userValidator.updateStatus,
  catchAsync(UserController.updateStatus)
);

export default router;
