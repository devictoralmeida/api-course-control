import { Router } from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { createCourseRequestSchema } from "../schemas/courseSchema";
import { validateAdmin } from "../middlewares/validateAdmin.middleware";
import { validateToken } from "../middlewares/validateToken.middleware";
import {
  createCourse,
  getAllCourses,
  getUsersByCourse,
  registrateUser,
  unregisterUser,
} from "../controllers/courses.controller";
import { validateIdExists } from "../middlewares/validateId.middleware";


export const coursesRouter: Router = Router();

coursesRouter.get("", getAllCourses);

coursesRouter.use('', validateToken, validateAdmin)

coursesRouter.post(
  "",
  validateBodyMiddleware(createCourseRequestSchema),
  createCourse
);

coursesRouter.post(
  "/:courseId/users/:userId",
  validateIdExists("params", "userId", "users", "User/course not found"),
  validateIdExists("params", "courseId", "courses", "User/course not found"),
  registrateUser
);

coursesRouter.get(
  "/:id/users",
  validateIdExists("params", "id", "users", "User/course not found"),
  getUsersByCourse
);

coursesRouter.delete(
  "/:courseId/users/:userId",
  validateIdExists("params", "userId", "users", "User/course not found"),
  validateIdExists("params", "courseId", "courses", "User/course not found"),
  unregisterUser
);
