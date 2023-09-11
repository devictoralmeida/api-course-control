import { Router } from "express";
import { loginSession } from "../controllers/session.controller";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { loginUserRequest } from "../schemas/userSchema";

export const sessionRouter: Router = Router();

sessionRouter.post("", validateBodyMiddleware(loginUserRequest), loginSession);
