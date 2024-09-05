import { ApiProperty } from '@nestjs/swagger';
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

export class CreatePostSwaggerDto {
  @ApiProperty({ description: 'O titulo de um post', example: 'Tirar o lixo' })
  title: string;
  @ApiProperty({
    description: 'O conteudo de um post',
    example: 'Comprar 3 bananas',
  })
  content: string;
}

export class updatePostSwaggerDto {
  @ApiProperty({ description: 'O titulo de um post', example: 'Tirar o lixo' })
  title: string;
  @ApiProperty({
    description: 'O conteudo de um post',
    example: 'Comprar 3 bananas',
  })
  content: string;
}
