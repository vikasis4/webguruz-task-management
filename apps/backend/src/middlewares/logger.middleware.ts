import morgan from "morgan";
import { logger } from "@/utils/logger";

const stream: morgan.StreamOptions = {
  write: (message) => logger.http(message.trim()),
};

const skip = (req: any) =>
  process.env.NODE_ENV === "test" || req.url.includes("/health");

export const httpLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);
