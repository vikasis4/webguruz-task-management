import path from "path";
import dotenv from "dotenv";
import z from "zod";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const schema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  MONGODB_URI: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  REDIS_URL: z.string().min(1),
  JWT_EXPIRES_IN: z.string().min(1),
  API_KEY: z.string().min(1),
});

export const envs = schema.parse(process.env);
export type Env = z.infer<typeof schema>;
