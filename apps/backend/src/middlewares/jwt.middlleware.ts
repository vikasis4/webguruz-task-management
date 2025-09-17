import jwt, { SignOptions } from "jsonwebtoken";
import { User } from "@/models/user.model";
import { redisClient } from "@/utils/redis";
import { envs } from "@/utils/process.env";
import { IUser } from "@repo/dto/modules/user";
import { JwtPayload } from "@repo/dto/jwt";

const JWT_SECRET = envs.JWT_SECRET as string;
const JWT_EXPIRES_IN = parseInt(envs.JWT_EXPIRES_IN || "3600");

export const createToken = async (user: IUser) => {
  const payload: JwtPayload = {
    userId: user._id.toString(),
    tokenVersion: user.tokenVersion,
    role: user.userRole,
  };

  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN,
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = async (token: string) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (redisClient.isOpen) {
      const version = await redisClient.get(
        `user:${payload.userId}:tokenVersion`
      );

      if (!version) {
        const user = await User.findById(payload.userId).select("tokenVersion");

        if (!user) throw new Error("User not found");
        if (user.tokenVersion !== payload.tokenVersion)
          throw new Error("Token invalid due to version mismatch");

        await redisClient.set(
          `user:${user._id}:tokenVersion`,
          user.tokenVersion.toString()
        );
      }

      if (Number(version) !== payload.tokenVersion)
        throw new Error("Token invalid due to version mismatch");
    }

    return payload;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

export const revokeTokens = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.tokenVersion += 1;
  await user.save();

  if (redisClient.isOpen) {
    await redisClient.set(
      `user:${userId}:tokenVersion`,
      user.tokenVersion.toString()
    );
  }

  return user.tokenVersion;
};
