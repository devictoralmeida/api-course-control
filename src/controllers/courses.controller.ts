import { Request, Response } from "express"
import { TCourse } from "../interfaces/courses.types";
import { createCourseService, registrateUserService, retrieveCoursesService, retrieveUsersByCourseService, unregisterUserService } from "../services/courses.service";
import { TUsersCourse } from "../interfaces/userCourses.types";

export const createCourse = async(request: Request, response: Response): Promise<Response> => {
    const course: TCourse = await createCourseService(request.body)
    return response.status(201).json(course);
}

export const getAllCourses = async(request: Request, response: Response): Promise<Response> => {
    const courses: TCourse[] = await retrieveCoursesService()
    return response.status(200).json(courses);
}

export const getUsersByCourse = async(request: Request, response: Response): Promise<Response> => {
    const {id} = request.params
    const courseId = Number(id)
    const users: TUsersCourse[] = await retrieveUsersByCourseService(courseId)
    return response.status(200).json(users);
}

export const registrateUser = async(request: Request, response: Response): Promise<Response> => {
    const {courseId, userId} = request.params
    await registrateUserService(courseId, userId)
    return response.status(201).json({message: "User successfully vinculed to course"});
}

export const unregisterUser = async(request: Request, response: Response): Promise<Response> => {
    const {courseId, userId} = request.params
    await unregisterUserService(courseId, userId)
    return response.status(204).json();
}