import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import AppError from "../errors/App.error";

export const handleErrors = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (error instanceof AppError) {
    return res.status(error.status).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({ message: error.flatten().fieldErrors });
  }

  return res.status(500).json({ error: "Internal server error" });
};
