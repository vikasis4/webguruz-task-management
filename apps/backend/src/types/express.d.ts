import { JwtPayload } from "@/middlewares/jwt.middlleware";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};
