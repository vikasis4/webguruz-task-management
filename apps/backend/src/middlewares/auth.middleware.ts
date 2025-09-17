import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/middlewares/jwt.middlleware";

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res
        .status(200)
        .json({ status: 401, data: {}, message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    const payload = await verifyToken(token);

    req.user = payload;

    next();
  } catch (err: any) {
    res
      .status(200)
      .json({ status: 401, data: {}, message: err.message || "Unauthorized" });
  }
};
