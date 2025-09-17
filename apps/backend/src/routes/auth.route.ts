import { authorize } from "@/middlewares/auth.middleware";
import { catchAsync } from "@/middlewares/catchAsync.middleware";
import AuthController from "@/modules/auth/auth.controller";
import authValidator from "@/modules/auth/auth.validation";
import Express from "express";

const router = Express.Router();

export const routeName = "auth";

router.post("/login", authValidator.login, catchAsync(AuthController.login));
router.post(
  "/register",
  authValidator.register,
  catchAsync(AuthController.register)
);
router.get("/verify", authorize, catchAsync(AuthController.verify));
router.get("/logout", authorize, catchAsync(AuthController.logout));

export default router;
