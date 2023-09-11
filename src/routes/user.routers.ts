import { Router } from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { createUserRequestSchema } from "../schemas/userSchema";
import { verifyUniqueEmail } from "../middlewares/uniqueEmail.middleware";
import {
  createUser,
  getCoursesByUser,
  retrieveUsers,
} from "../controllers/users.controller";
import { validateToken } from "../middlewares/validateToken.middleware";
import { validateAdmin } from "../middlewares/validateAdmin.middleware";
import { validateUserHasCourse } from "../middlewares/validateUserHasCourse.middleware";
import { validateIdExists } from "../middlewares/validateId.middleware";


export const userRouter: Router = Router();

userRouter.use('/:id/courses', validateToken, validateAdmin, validateIdExists("params", "id", "users", "User/course not found"))

userRouter.post(
  "",
  validateBodyMiddleware(createUserRequestSchema),
  verifyUniqueEmail,
  createUser
);

userRouter.get("", retrieveUsers);

userRouter.get(
  "/:id/courses",
  validateUserHasCourse,
  getCoursesByUser
);
