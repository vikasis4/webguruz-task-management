import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "@repo/dto/modules/user";

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    userRole: {
      type: String,
      enum: ["admin", "user"],
      required: true,
      default: "user",
    },
    password: { type: String, required: true },
    tokenVersion: { type: Number, default: 1 },

    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.setPassword = async function (
  password: string
): Promise<void> {
  this.password = await bcrypt.hash(password, 10);
};

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model<IUser>("User", UserSchema);
