import { z } from 'zod';

export const createUserSchema = z
  .object({
    email: z.string().email(),
    name: z.string(),
    hash: z.string().min(8),
  })
  .required();

export type CreateUserDto = z.infer<typeof createUserSchema>;

export const logInUserSchema = z
  .object({
    email: z.string().email(),
    hash: z.string().min(8),
  })
  .required();

export type logInUserDto = z.infer<typeof logInUserSchema>;
