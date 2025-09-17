import mongoose from "mongoose";
import { envs } from "@/utils/process.env";
import { logger } from "@/utils/logger";

export const connectDB = async (): Promise<typeof mongoose> => {
  try {
    const conn = await mongoose.connect(envs.MONGODB_URI, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    });

    logger.info(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    logger.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
