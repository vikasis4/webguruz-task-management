import { IUserRole } from "./modules/user";

export interface JwtPayload {
  userId: string;
  tokenVersion: number;
  role: IUserRole;
}
