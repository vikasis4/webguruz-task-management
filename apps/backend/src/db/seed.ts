import mongoose, { Types } from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Task } from "../models/task.model";
import { User } from "../models/user.model";
import { envs } from "../utils/process.env";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
console.warn("PORT", process.env.PORT);

const SALT_ROUNDS = 10;

const sampleUsers = [
  {
    email: "admin@example.com",
    userRole: "admin" as const,
    password: "Admin@123",
    isActive: true,
  },
  {
    email: "user1@example.com",
    userRole: "user" as const,
    password: "User1@123",
    isActive: true,
  },
  {
    email: "user2@example.com",
    userRole: "user" as const,
    password: "User2@123",
    isActive: true,
  },
  {
    email: "user3@example.com",
    userRole: "user" as const,
    password: "Manager@123",
    isActive: true,
  },
  {
    email: "disabled@example.com",
    userRole: "user" as const,
    password: "Disabled@123",
    isActive: false,
  },
];

const taskTitles = [
  "Develop API endpoints",
  "Design user interface",
  "Write unit tests",
  "Configure CI/CD pipeline",
  "Write documentation",
  "Perform load testing",
  "Add monitoring & alerts",
  "Fix authentication bug",
  "Implement RBAC",
  "Migrate DB schema",
  "Optimize queries",
  "Improve caching layer",
  "Refactor legacy module",
  "Add pagination",
  "Improve accessibility",
  "Add analytics",
  "Implement rate limiting",
  "Add background jobs",
  "Support file uploads",
  "Implement SSO",
];

async function hashPassword(plain: string) {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

async function runSeeder() {
  console.log("Starting seeder...");

  await User.deleteMany({});
  await Task.deleteMany({});
  console.log("Cleared users and tasks collections.");

  const createdUsers = [];
  for (const u of sampleUsers) {
    const hashed = await hashPassword(u.password);
    const created = await User.create({
      email: u.email,
      userRole: u.userRole,
      password: hashed,
      isActive: u.isActive,
    });
    createdUsers.push(created);
    console.log(`Created user: ${created.email} (${created.userRole})`);
  }

  const userIds: Types.ObjectId[] = createdUsers.map(
    (u) => u._id as unknown as Types.ObjectId
  );

  const statuses = ["pending", "in-progress", "completed"] as const;
  const priorities = ["low", "medium", "high"] as const;

  const tasksToInsert: Array<Record<string, any>> = [];

  for (let i = 0; i < taskTitles.length * 3; i++) {
    const title =
      taskTitles[i % taskTitles.length] +
      (i >= taskTitles.length
        ? ` (part ${Math.floor(i / taskTitles.length)})`
        : "");
    const creator = userIds[i % userIds.length];
    const status = statuses[i % statuses.length];
    const priority = priorities[i % priorities.length];
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + (i % 30));

    tasksToInsert.push({
      title,
      description: `${title} — detailed description for seeding (auto-generated).`,
      createdBy: creator,
      status,
      priority,
      tags: ["seed", "auto", `batch-${Math.floor(i / taskTitles.length)}`],
      dueDate,
    });
  }

  const inserted = await Task.insertMany(tasksToInsert);
  console.log(`Inserted ${inserted.length} tasks.`);

  console.log("Seeding finished. Disconnecting.");
}

async function main() {
  const MONGO_URI = envs.MONGODB_URI;
  if (!MONGO_URI) {
    console.error("MONGO_URI not set in env.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB.");
    await runSeeder();
  } catch (err) {
    console.error("Seeder error:", err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

main();
