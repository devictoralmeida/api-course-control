import { Request, Response } from "express";
import { createUserService, retrieveUserCoursesService, retrieveUsersService } from "../services/users.service";
import { TUser, TUsersRead } from "../interfaces/users.types";
import { TUsersCourse } from "../interfaces/userCourses.types";

export const createUser = async (request: Request, response: Response): Promise<Response> => {
    const user: TUser = await createUserService(request.body)
    return response.status(201).json(user);
}

export const retrieveUsers = async (request: Request, response: Response): Promise<Response> => {
    const users: TUsersRead = await retrieveUsersService()
    return response.status(200).json(users);
}

export const getCoursesByUser = async (request: Request, response: Response): Promise<Response> => {
    const {id} = request.params
    const userId = Number(id)
    const courses: TUsersCourse[] = await retrieveUserCoursesService(userId)
    return response.status(200).json(courses)
}