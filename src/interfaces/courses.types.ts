import { QueryResult } from "pg";
import { z } from "zod";
import {
  courseSchema,
  createCourseRequestSchema,
  updateCourseSchema,
} from "../schemas/courseSchema";

export type TCourse = z.infer<typeof courseSchema>;
export type TCourseRequest = z.infer<typeof createCourseRequestSchema>;
export type TCourseUpdate = z.infer<typeof updateCourseSchema>;

export type TCourseResult = QueryResult<TCourse>;
