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
