import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../modules/auth/auth.model";
import config from "../../config";
export const isAuthenticated = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      res.status(401).json({ success: false, message: "Token required" });
    else {
      const decoded = jwt.verify(token as string, config.jwt_secret || "");
      const user = await User.findById((decoded as { id: string }).id);
      if (!user || user.isBlocked) {
        res.status(403).json({ success: false, message: "Access denied" });
      }

      req.user = user;
      next();
    }
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const isAdmin = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== "admin") {
    res
      .status(403)
      .json({ success: false, message: "Admin privileges required" });
  }
  next();
};
