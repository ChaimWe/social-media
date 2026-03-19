import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import { ZodError } from "zod";

export default function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ZodError) {
    const errors = err.issues.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors,
    });
  }

  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
}
