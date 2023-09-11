import { z } from "zod";

export const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50, "O nome deve conter no máximo 50 caracteres"),
  email: z
    .string()
    .email("Insira um formato de e-mail válido")
    .max(50, "O e-mail deve conter no máximo 50 caracteres"),
  password: z.string().max(120, "A senha deve conter no máximo 120 caracteres"),
  admin: z.boolean().default(false),
});

export const createUserRequestSchema = userSchema.omit({ id: true });
export const createUserResponseSchema = userSchema.omit({ password: true });

export const retrieveUsersSchema = createUserResponseSchema.array();

export const updateUserSchema = createUserRequestSchema.partial();

export const loginUserRequest = userSchema.pick({
  email: true,
  password: true,
});
