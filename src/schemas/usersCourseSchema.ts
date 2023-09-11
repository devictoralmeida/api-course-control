import { z } from "zod";

export const usersByCourseSchema = z.object({
  userId: z.number().positive(),
  courseId: z.number().positive(),
  userName: z
    .string()
    .max(50, "O nome deve conter no máximo 50 caracteres")
    .min(3, "O nome deve conter no mínimo 3 caracteres"),
  courseName: z
    .string()
    .max(15, "O nome do curso deve conter no máximo 15 caracteres")
    .min(3, "O nome do curso deve conter no mínimo 3 caracteres"),
  courseDescription: z
    .string()
    .nonempty("A descrição do curso não pode estar vazia"),
  userActiveInCourse: z.boolean(),
});

export const usersByCourseArraySchema = usersByCourseSchema.array();
