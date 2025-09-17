import { logger } from "@/utils/logger";
import fs from "fs";
import path from "path";
import Express from "express";

function getRoutes(app: Express.Application) {
  try {
    const currentDir = __dirname;
    const files = fs.readdirSync(currentDir);

    const filteredFiles = files.filter(
      (file) => !file.includes("index") && !file.endsWith(".js.map")
    );

    for (let file of filteredFiles) {
      const module = require(path.join(currentDir, file));
      const routerModule = module.default;
      const { routeName } = module;
      const router = routerModule;

      if (!router) throw new Error(`Router not found for file: ${file}`);
      if (!routeName) throw new Error(`Route name not found for file: ${file}`);

      app.use(`/api/${routeName}`, router);
    }
  } catch (err: any) {
    logger.error("Error setting up routes:", err);
    throw err;
  }
}

export default getRoutes;
