import { Request, Response, NextFunction } from "express";
import z, { ZodError } from "zod";
export const validator =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({
          message: "Validation failed",
          success: false,
          errors: err.errors,
          stack: err.stack,
        });
      }
      next(err);
    }
  };
