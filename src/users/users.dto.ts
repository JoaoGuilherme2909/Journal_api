import { ApiProperty } from '@nestjs/swagger';
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

export class CreateUserSwaggerDto {
  @ApiProperty({ description: 'Email', example: 'email@example.com' })
  email: string;
  @ApiProperty({ description: 'Nome', example: 'John Doe' })
  name: string;
  @ApiProperty({ description: 'senha', example: '12345678' })
  hash: string;
}

export class LogInUserSwaggerDto {
  @ApiProperty({ description: 'Email', example: 'email@example.com' })
  email: string;
  @ApiProperty({ description: 'senha', example: '12345678' })
  hash: string;
}
