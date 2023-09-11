import { QueryResult } from "pg";
import {
  createUserRequestSchema,
  createUserResponseSchema,
  loginUserRequest,
  updateUserSchema,
  userSchema,
} from "../schemas/userSchema";
import { z } from "zod";

export type TUser = z.infer<typeof createUserResponseSchema>;
export type TUsersRead = TUser[];

export type TUserRequest = z.infer<typeof createUserRequestSchema>;
export type TUserLogin = z.infer<typeof loginUserRequest>;

export type TUserUpdate = z.infer<typeof updateUserSchema>;

export type TUserWithPassword = z.infer<typeof userSchema>;

export type TUserResult = QueryResult<TUser>;
export type TUsersArrayResult = QueryResult<TUsersRead>;
export type TUserWithPasswordResult = QueryResult<TUserWithPassword>;
