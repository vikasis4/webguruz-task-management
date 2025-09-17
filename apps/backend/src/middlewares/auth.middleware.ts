import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/middlewares/jwt.middlleware";
import { envs } from "@/utils/process.env";
import { logger } from "@/utils/logger";
import { JwtPayload } from "@repo/dto/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isTokenVerification = req.originalUrl === "/api/auth/verify";
    const authToken =
      req.cookies["Authorization"] || req.headers["Authorization"];

    if (!authToken || !authToken.startsWith("Bearer "))
      return res.status(200).json({
        status: isTokenVerification ? 403 : 401,
        data: {},
        message: "Unauthorized",
      });

    const token = authToken.split(" ")[1];
    const payload = await verifyToken(token);

    req.user = payload;

    next();
  } catch (err: any) {
    res
      .status(200)
      .json({ status: 401, data: {}, message: err.message || "Unauthorized" });
  }
};

export const apiKey = (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey || apiKey !== envs.API_KEY)
      return res.status(200).json({
        status: 401,
        data: {},
        message: "Unauthorized",
      });

    next();
  } catch (err: any) {
    res.status(200).json({
      status: 500,
      data: {},
      message: err.message || "Internal Server Error",
    });
  }
};
