import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { AppError } from "../errors/errors";
import {
  TUsersCourse,
  TUsersCourseResult,
} from "../interfaces/userCourses.types";

export const validateUserHasCourse = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = request.params;

  const queryTemplate: string = `SELECT * FROM "userCourses" WHERE "userId" = $1;`;

  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [id],
  };

  const queryResult: TUsersCourseResult = await client.query(queryConfig);
  const userHasCourse: TUsersCourse[] = queryResult.rows;

  if (!userHasCourse || userHasCourse.length === 0) {
    throw new AppError("No course found", 404);
  }

  return next();
};
