import { NextFunction, Request, Response } from "express";
import config from "../../config";

export const errorHandler = (
  err: Error & { statusCode?: number; error?: Error },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(201).json({
    message: err.message || "Internal Server Error",
    success: false,
    error: err.error || err,
    stack: config.node_env === "development" ? err.stack : undefined,
  });
};
