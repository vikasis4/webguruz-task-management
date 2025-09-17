import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

const UpdateStatusSchema = z.object({
  userId: z.string().nonempty("User ID is required"),
  isActive: z.boolean(),
});

class UserValidator {
  constructor() {
    this.updateStatus = this.updateStatus.bind(this);
  }

  updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      UpdateStatusSchema.parse(req.body);
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

const userValidator = new UserValidator();
export default userValidator;
