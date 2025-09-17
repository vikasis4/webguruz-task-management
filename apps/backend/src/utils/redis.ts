import { createClient } from "redis";
import { envs } from "./process.env";
import { logger } from "./logger";

export const redisClient = createClient({
  url: envs.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => logger.error("Redis Client Error", err));

(async () => {
  const redis = await redisClient.connect();
  logger.info("Redis connected");
})();
