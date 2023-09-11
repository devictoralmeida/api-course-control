import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";
import { z } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export const handleError = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof z.ZodError) {
    return response.status(400).json(err.flatten().fieldErrors);
  }

  if (err instanceof JsonWebTokenError) {
    return response.status(401).json({error: err.message});
  }

  console.error(err);
  return response.status(500).json({ message: "Internal Server Error." });
};
