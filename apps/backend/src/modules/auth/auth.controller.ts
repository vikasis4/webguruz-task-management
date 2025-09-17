import { Request } from "express";
import "@repo/eslint-config";
import IAuthDto from "@repo/dto/auth";
import { User } from "@/models/user.model";
import { createToken } from "@/middlewares/jwt.middlleware";
import { ResponseObject } from "@/middlewares/catchAsync.middleware";
import AuthService from "./auth.service";
import { redisClient } from "@/utils/redis";

class AuthController {
  static async login(req: Request): Promise<ResponseObject> {
    const payload = req.body as IAuthDto["login"];

    const user = await AuthService.getValidUser(payload.email);

    const isCorrectPassword = user.comparePassword(payload.password);
    if (!isCorrectPassword) throw new Error("Invalid password");

    const token = await createToken(user);
    return {
      status: 200,
      message: "Login successful",
      data: {
        user: {
          userId: user._id,
          role: user.userRole,
          tokenVersion: user.tokenVersion,
        },
      },
      cookie: [
        {
          key: "Authorization",
          value: `Bearer ${token}`,
          options: { httpOnly: true, secure: true, sameSite: "lax" },
        },
      ],
    };
  }

  static async register(req: Request): Promise<ResponseObject> {
    const payload = req.body as IAuthDto["register"];

    const user = await User.create(payload);
    const token = await createToken(user);

    return {
      status: 200,
      message: "Register successful",
      data: {
        user: {
          userId: user._id,
          role: user.userRole,
          tokenVersion: user.tokenVersion,
        },
      },
      cookie: [
        {
          key: "Authorization",
          value: `Bearer ${token}`,
          options: { httpOnly: true, secure: true, sameSite: "lax" },
        },
      ],
    };
  }

  static async verify(req: Request): Promise<ResponseObject> {
    return {
      status: 200,
      message: "Verified",
      data: { user: req.user },
    };
  }

  static async logout(req: Request): Promise<ResponseObject> {
    if (redisClient.isOpen)
      await redisClient.del(`user:${req.user?.userId}:tokenVersion`);

    await User.findByIdAndUpdate(req.user?.userId, {
      tokenVersion: Number(req.user?.tokenVersion) + 1,
    });

    return {
      status: 200,
      message: "Logout successful",
      data: {},
      cookie: [
        {
          key: "Authorization",
          value: "",
          options: { httpOnly: true, secure: true, sameSite: "lax" },
        },
      ],
    };
  }
}

export default AuthController;
