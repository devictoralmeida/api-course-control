import { QueryResult } from "pg";
import { usersByCourseSchema } from "../schemas/usersCourseSchema";
import { z } from "zod";

export type TUsersCourse = z.infer<typeof usersByCourseSchema>;
export type TUsersCourseResult = QueryResult<TUsersCourse>;
