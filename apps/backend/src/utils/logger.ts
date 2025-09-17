import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import { envs } from "@/utils/process.env";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

winston.addColors({
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
});

const devFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(
    ({ timestamp, level, message, stack }) =>
      `${timestamp} [${level}]: ${stack || message}`
  )
);

const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const dailyRotateTransport = new DailyRotateFile({
  dirname: path.join(process.cwd(), "logs"),
  filename: "app-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxFiles: "14d",
  level: "info",
  format: envs.NODE_ENV === "production" ? prodFormat : devFormat,
});

export const logger = winston.createLogger({
  levels,
  level: envs.NODE_ENV === "production" ? "info" : "debug",
  format: envs.NODE_ENV === "production" ? prodFormat : devFormat,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(process.cwd(), "logs/error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(process.cwd(), "logs/combined.log"),
    }),
    dailyRotateTransport,
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(process.cwd(), "logs/exceptions.log"),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(process.cwd(), "logs/rejections.log"),
    }),
  ],
});
