import { Request, Response } from "express";
import { loginUserService } from "../services/session.service";

export const loginSession = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const token: string = await loginUserService(request.body);
  return response.status(200).json({ token });
};