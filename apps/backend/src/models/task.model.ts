import mongoose, { Schema, Document } from "mongoose";

export type ITaskStatus = "pending" | "in-progress" | "completed";
export type ITaskPriority = "low" | "medium" | "high";

export interface ITask extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  createdBy: mongoose.Types.ObjectId;
  status: ITaskStatus;
  createdAt: Date;
  updatedAt: Date;
  priority: ITaskPriority;
  tags: string[];
  dueDate: Date;
}

export const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model<ITask>("Task", TaskSchema);
