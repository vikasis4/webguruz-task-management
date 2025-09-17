import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export type IUserRole = "admin" | "user";
export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  tokenVersion: number;
  userRole: IUserRole;
  setPassword(password: string): Promise<void>;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  userRole: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  },
  password: { type: String, required: true },
  tokenVersion: { type: Number, default: 1 },
});

UserSchema.methods.setPassword = async function (password: string) {
  this.password = await bcrypt.hash(password, 10);
};

UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

export const UserSchemaModel = mongoose.model<IUser>("User", UserSchema);
