import { Request, Response, NextFunction, CookieOptions } from "express";
import { logger } from "@/utils/logger";

export interface ResponseObject {
  status: number;
  data?: any;
  message: string;
  errors?: any;
  cookie?: Array<{
    key: string;
    value: string;
    options?: CookieOptions;
  }>;
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

      if (result.cookie)
        for (const cookie of result.cookie)
          res.cookie(cookie.key, cookie.value, cookie.options ?? {});

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
        errors: err.errors || [],
      });
    }
  };
