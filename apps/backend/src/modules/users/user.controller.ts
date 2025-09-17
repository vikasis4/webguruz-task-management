import { ResponseObject } from "@/middlewares/catchAsync.middleware";
import { User } from "@/models/user.model";
import { Request } from "express";
import IUserDto from "@repo/dto/user";
import { redisClient } from "@/utils/redis";

class UserController {
  static async getUsers(): Promise<ResponseObject> {
    const users = await User.find();
    return {
      status: 200,
      data: { users },
      message: "Fetched users successful",
    };
  }

  static async updateStatus(req: Request): Promise<ResponseObject> {
    const payload = req.body as IUserDto["updateStatus"];

    const user = await User.findById(payload.userId);
    if (!user) throw new Error("User not found");

    user.isActive = payload.isActive;
    user.tokenVersion += 1;

    await user.save();

    redisClient.isOpen &&
      (await redisClient.set(
        `user:${user._id}:tokenVersion`,
        user.tokenVersion.toString()
      ));

    return {
      status: 200,
      data: {},
      message: "Updated status successful",
    };
  }
}

export default UserController;
