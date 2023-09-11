import { Request, Response } from "express";
import { loginUserService } from "../services/session.service";
import { TToken } from "../interfaces/token.types";

export const loginSession = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const token: TToken = await loginUserService(request.body);
  return response.status(200).json({ token: token });
};