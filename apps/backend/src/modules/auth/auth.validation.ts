import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { AuthSchema } from "@repo/dto/auth";

class AuthValidator {
  constructor() {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  login(req: Request, res: Response, next: NextFunction) {
    try {
      AuthSchema.formSchema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(200).json({
          status: 400,
          message: "Validation failed",
          errors: error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      }
      next(error);
    }
  }

  register(req: Request, res: Response, next: NextFunction) {
    try {
      AuthSchema.formSchema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(200).json({
          status: 400,
          message: "Validation failed",
          errors: error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      }
      next(error);
    }
  }
}

const authValidator = new AuthValidator();
export default authValidator;
