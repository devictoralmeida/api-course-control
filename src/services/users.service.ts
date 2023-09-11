import format from "pg-format";
import {
  createUserResponseSchema,
  retrieveUsersSchema,
} from "../schemas/userSchema";
import { client } from "../database";
import {
  TUser,
  TUsersRead,
  TUserRequest,
  TUserResult,
} from "../interfaces/users.types";
import { hashSync } from "bcryptjs";
import { QueryConfig } from "pg";
import {
  TUsersCourse,
  TUsersCourseResult,
} from "../interfaces/userCourses.types";
import { usersByCourseArraySchema } from "../schemas/usersCourseSchema";

export const createUserService = async (
  payload: TUserRequest
): Promise<TUser> => {
  payload.password = hashSync(payload.password, 10);

  const updateColumn: string[] = Object.keys(payload);
  const updateValues: (string | boolean)[] = Object.values(payload);

  const queryString: string = `INSERT INTO "users" (%I) VALUES (%L) RETURNING *;`;

  const queryFormat: string = format(queryString, updateColumn, updateValues);

  const queryResult: TUserResult = await client.query(queryFormat);
  const user: TUser = queryResult.rows[0];

  return createUserResponseSchema.parse(user);
};

export const retrieveUsersService = async (): Promise<TUsersRead> => {
  const queryString: string = `SELECT * FROM "users";`;
  const queryResult: TUserResult = await client.query(queryString);
  const users: TUsersRead = queryResult.rows;
  return retrieveUsersSchema.parse(users);
};

export const retrieveUserCoursesService = async (
  id: number
): Promise<TUsersCourse[]> => {
  const queryTemplate: string = `
        SELECT 
            "c"."id" AS "courseId", 
            "c"."name" AS "courseName",
            "c"."description" AS "courseDescription",
            "uc"."active" AS "userActiveInCourse",
            "u"."id" AS "userId", 
            "u"."name" AS "userName"
        FROM "users" AS "u"
        JOIN "userCourses" AS "uc"
            ON "u"."id" = "uc"."userId"
        JOIN "courses" AS "c"
            ON "c"."id" = "uc"."courseId"
        WHERE "u"."id" = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [id],
  };

  const queryResult: TUsersCourseResult = await client.query(queryConfig);
  const courses: TUsersCourse[] = queryResult.rows;

  return usersByCourseArraySchema.parse(courses);
};
