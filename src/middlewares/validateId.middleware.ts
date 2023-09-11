import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { AppError } from "../errors/errors";
import { TUserResult } from "../interfaces/users.types";
import format from "pg-format";

type BodyOrParams = "body" | "params";

export const validateIdExists =
  (
    bodyOrParams: BodyOrParams,
    idKeyName: string,
    tbName: string,
    errorMsg: string
  ) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id: string = req[bodyOrParams][idKeyName];
    const queryFormat: string = format(
      'SELECT * FROM %I WHERE "id" = $1',
      tbName
    );

    const query: TUserResult = await client.query(queryFormat, [id]);

    if (query.rowCount === 0) {
      throw new AppError(errorMsg, 404);
    }

    res.locals = { ...res.locals, foundData: query.rows[0] };

    return next();
  };
