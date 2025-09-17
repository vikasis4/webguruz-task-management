import { NextFunction, Request, Response } from "express";

const requireRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user)
      return res
        .status(200)
        .json({ status: 401, data: {}, message: "Unauthorized" });

    const hasRole = allowedRoles.includes(req.user.role);

    if (!hasRole)
      return res.status(200).json({
        status: 403,
        data: {},
        message: "Forbidden: insufficient role",
      });

    next();
  };
};

export default requireRole;
