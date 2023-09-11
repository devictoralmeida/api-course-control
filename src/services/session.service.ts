import "dotenv/config";
import { QueryConfig } from "pg";
import { client } from "../database";
import { AppError } from "../errors/errors";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import {
  TUserLogin,
  TUserWithPassword,
  TUserWithPasswordResult,
} from "../interfaces/users.types";
import { TToken } from "../interfaces/token.types";

export const loginUserService = async (
  payload: TUserLogin
): Promise<TToken> => {
  const { email } = payload;

  const queryTemplate: string = `SELECT * FROM "users" WHERE email = $1;`;

  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [email],
  };

  const queryResult: TUserWithPasswordResult = await client.query(queryConfig);
  const user: TUserWithPassword | undefined = queryResult.rows[0];

  const errorMessage: string = "Wrong email/password";

  if (user === undefined) {
    throw new AppError(errorMessage, 401);
  }

  const isPasswordValid: boolean = compareSync(payload.password, user.password);

  if (!isPasswordValid) {
    throw new AppError(errorMessage, 401);
  }

  const token: string = sign(
    { email: user.email, admin: user.admin },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: user.id.toString(),
    }
  );

  return token;
};
