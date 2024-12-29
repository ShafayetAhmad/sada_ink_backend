import { NextFunction, Request, Response } from "express";
import config from "../../config";

export const errorHandler = (
  err: Error & { statusCode?: number; error?: Error },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  if (config.node_env === "development") {
    console.error(`[Error] ${err.message}`, err);
  }
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    statusCode,
    error: config.node_env === "development" ? err.message : undefined,
    stack: config.node_env === "development" ? err.stack : undefined,
  });
};
