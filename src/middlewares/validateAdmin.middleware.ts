import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";

export const validateAdmin = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const { admin } = response.locals.decoded;

  if (!admin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};
