import { z } from "zod";

export const courseSchema = z.object({
  id: z.number().positive(),
  name: z
    .string()
    .max(15, "O nome do curso deve conter no máximo 15 caracteres")
    .min(3, "O nome do curso deve conter no mínimo 3 caracteres"),
  description: z.string().nonempty("A descrição do curso não pode estar vazia"),
});

export const createCourseRequestSchema = courseSchema.omit({ id: true });
export const retrieveCoursesSchema = courseSchema.array();
export const updateCourseSchema = courseSchema.partial();
