import format from "pg-format";
import { client } from "../database";
import {
  TCourse,
  TCourseRequest,
  TCourseResult,
} from "../interfaces/courses.types";
import { courseSchema, retrieveCoursesSchema } from "../schemas/courseSchema";
import { QueryConfig } from "pg";
import { usersByCourseArraySchema } from "../schemas/usersCourseSchema";
import {
  TUsersCourse,
  TUsersCourseResult,
} from "../interfaces/userCourses.types";

export const createCourseService = async (
  payload: TCourseRequest
): Promise<TCourse> => {
  const updateColumn: string[] = Object.keys(payload);
  const updateValues: string[] = Object.values(payload);

  const queryString: string = `INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;`;

  const queryFormat: string = format(queryString, updateColumn, updateValues);

  const queryResult: TCourseResult = await client.query(queryFormat);
  const course: TCourse = queryResult.rows[0];

  return courseSchema.parse(course);
};

export const retrieveCoursesService = async (): Promise<TCourse[]> => {
  const queryString: string = `SELECT * FROM "courses";`;

  const queryResult: TCourseResult = await client.query(queryString);
  const courses: TCourse[] = queryResult.rows;

  return retrieveCoursesSchema.parse(courses);
};

export const retrieveUsersByCourseService = async (
  courseId: number
): Promise<TUsersCourse[]> => {
  const queryTemplate: string = `
        SELECT 
            "c"."id" AS "courseId", 
            "c"."name" AS "courseName",
            "c"."description" AS "courseDescription",
            "uc"."active" AS "userActiveInCourse",
            "u"."id" AS "userId", 
            "u"."name" AS "userName"
        FROM "courses" AS "c"
        JOIN "userCourses" AS "uc"
            ON "c"."id" = "uc"."courseId"
        JOIN "users" AS "u"
            ON "u"."id" = "uc"."userId"
        WHERE "c"."id" = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [courseId],
  };

  const queryResult: TUsersCourseResult = await client.query(queryConfig);
  const users: TUsersCourse[] = queryResult.rows;

  return usersByCourseArraySchema.parse(users);
};

export const registrateUserService = async (
  courseId: string,
  userId: string
): Promise<void> => {
  const queryString: string = `
        INSERT INTO "userCourses"
            ("userId", "courseId")
        VALUES
            ($1, $2)
        RETURNING *;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId, courseId],
  };

  await client.query(queryConfig);
  return;
};

export const unregisterUserService = async (
  courseId: string,
  userId: string
): Promise<void> => {
  const queryString: string = `
        UPDATE "userCourses"
        SET "active" = false
        WHERE
            "userId" = $1
        AND
            "courseId" = $2;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId, courseId],
  };

  await client.query(queryConfig);
  return;
};
