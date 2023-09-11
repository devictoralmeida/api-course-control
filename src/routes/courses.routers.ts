import { Router } from "express";
import { getAllCourses, createCourse, registrateUser, getUsersByCourse, unregisterUser } from "../controllers/courses.controller";
import { validateAdmin } from "../middlewares/validateAdmin.middleware";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { validateIdExists } from "../middlewares/validateId.middleware";
import { validateToken } from "../middlewares/validateToken.middleware";
import { createCourseRequestSchema } from "../schemas/courseSchema";


export const coursesRouter: Router = Router();

coursesRouter.get("", getAllCourses);

coursesRouter.post(
  "",
  validateToken,
  validateAdmin,
  validateBodyMiddleware(createCourseRequestSchema),
  createCourse
);

coursesRouter.post(
  "/:courseId/users/:userId",
  validateToken,
  validateAdmin,
  validateIdExists("params", "userId", "users", "User/course not found"),
  validateIdExists("params", "courseId", "courses", "User/course not found"),
  registrateUser
);

coursesRouter.get(
  "/:id/users",
  validateToken,
  validateAdmin,
  validateIdExists("params", "id", "users", "User/course not found"),
  getUsersByCourse
);

coursesRouter.delete(
  "/:courseId/users/:userId",
  validateToken,
  validateAdmin,
  validateIdExists("params", "userId", "users", "User/course not found"),
  validateIdExists("params", "courseId", "courses", "User/course not found"),
  unregisterUser
);
