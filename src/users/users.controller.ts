import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  createUserSchema,
  CreateUserSwaggerDto,
} from './users.dto';
import { ZodValidationPipe } from 'src/pipes/zod.pipe';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  @ApiBody({ type: CreateUserSwaggerDto })
  async register(@Body() user: CreateUserDto) {
    const userAlreadyExists = await this.UsersService.userAlreadyExists(
      user.email,
    );

    if (userAlreadyExists === null) {
      return this.UsersService.resgister(user);
    }
    throw new BadRequestException('User already exists');
  }
}
