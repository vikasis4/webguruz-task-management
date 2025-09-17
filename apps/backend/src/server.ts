import express from "express";
import { envs } from "@/utils/process.env";
import { connectDB } from "@/db/mongo";
import { httpLogger } from "@/middlewares/logger.middleware";
import { logger } from "./utils/logger";
import errorHandler from "./middlewares/errorHandler.middleware";
import compress from "compression";
import getRoutes from "./routes/index.route";
import { apiKey } from "./middlewares/auth.middleware";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://yourfrontend.com"],
    credentials: true,
  })
);
app.use(apiKey);
app.use(cookieParser());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);
app.use(errorHandler);

getRoutes(app);

const start = async () => {
  await connectDB();

  app.listen(envs.PORT, () => {
    logger.info(`Server running on port ${envs.PORT}`);
  });
};

start();
