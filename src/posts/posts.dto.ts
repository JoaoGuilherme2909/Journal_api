import { z } from 'zod';

export const createPostSchema = z
  .object({
    title: z.string().max(64),
    content: z.string().max(256),
  })
  .required();

export type CreatePostDto = z.infer<typeof createPostSchema>;

export const updatePostSchema = z.object({
  title: z.string().max(64),
  content: z.string().max(256),
});

export type updatePostDto = z.infer<typeof updatePostSchema>;
