import { Request, Response, NextFunction } from "express";
import { logger } from "@/utils/logger";

interface ResponseObject {
  status: number;
  data?: any;
  message: string;
}

export const catchAsync =
  (
    fn: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<ResponseObject>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await fn(req, res, next);

      res.status(200).json({
        status: result.status,
        data: result.data || {},
        message: result.message,
      });
    } catch (err: any) {
      logger.error(
        `${req.method} ${req.url} - ${err.statusCode || 500} - ${err.message} - ${err.stack || ""}`
      );

      res.status(200).json({
        status: err.statusCode || 500,
        data: {},
        message: err.message || "Internal Server Error",
      });
    }
  };
