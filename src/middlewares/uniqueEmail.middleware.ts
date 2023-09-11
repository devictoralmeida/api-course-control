import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { AppError } from "../errors/errors";
import {
  TUserWithPasswordResult,
  TUserWithPassword,
} from "../interfaces/users.types";

export const verifyUniqueEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = request.body;

  const queryTemplate: string = `SELECT * FROM "users" WHERE email = $1;`;

  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [email],
  };

  const queryResult: TUserWithPasswordResult = await client.query(queryConfig);
  const foundedUser: TUserWithPassword = queryResult.rows[0];

  if (foundedUser) {
    throw new AppError("Email already registered", 409);
  }

  return next();
};
