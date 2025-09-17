import { Request, Response, NextFunction } from "express";
import { logger } from "@/utils/logger";

interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  logger.error(
    `${req.method} ${req.url} - ${statusCode} - ${message} - ${
      err.stack || "no stack"
    }`
  );

  if (statusCode >= 500) {
    logger.error(err.stack);
  } else if (statusCode >= 400) {
    logger.warn(err.message);
  }

  res.status(200).json({
    status: statusCode,
    data: {},
    message,
  });
};

export default errorHandler;
