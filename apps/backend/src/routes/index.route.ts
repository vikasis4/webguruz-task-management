import { logger } from "@/utils/logger";
import fs from "fs";
import Express from "express";

function getRoutes(app: Express.Application) {
  fs.readdir(".", (err, files) => {
    if (err) return logger.error("Error reading directory:", err);

    const filteredFiles = files.filter((file) => !file.includes("index"));

    for (let file of filteredFiles) {
      const module = require(`./${file}`);
      const def = module.default;
      const routeName = def.routeName;

      if (!def.router) throw new Error("No router found");
      if (!routeName) throw new Error("No route name found");

      app.use(routeName, def);
    }
  });
}

export default getRoutes;
