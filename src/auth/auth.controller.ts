import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { logInUserDto } from 'src/users/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post()
  async login(@Body() user: logInUserDto) {
    return this.auth.login(user);
  }
}
