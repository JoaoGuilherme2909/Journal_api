import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  logInUserDto,
  logInUserSchema,
  LogInUserSwaggerDto,
} from 'src/users/users.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/pipes/zod.pipe';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(logInUserSchema))
  @ApiBody({ type: LogInUserSwaggerDto })
  async login(@Body() user: logInUserDto) {
    return this.auth.login(user);
  }
}
