export type IUserRole = "admin" | "user";

export interface IUserMethods {
  setPassword(password: string): Promise<void>;
  comparePassword(password: string): Promise<boolean>;
}

export interface IUser extends Document, IUserMethods {
  _id: string;
  email: string;
  password: string;
  tokenVersion: number;
  userRole: IUserRole;
  createdAt: Date;
  updatedAt: Date;

  isActive: boolean;
  isDeleted: boolean;
}
