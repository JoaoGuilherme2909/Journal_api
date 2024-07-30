import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { logInUserDto } from 'src/users/users.dto';
import { UsersService } from 'src/users/users.service';
import * as argon from 'argon2';
import { payload } from 'src/types/payload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
  ) {}

  async login({ email, hash }: logInUserDto) {
    const user = await this.usersService.userAlreadyExists(email);
    if (user !== null) {
      if (await argon.verify(user.hash, hash)) {
        const payload: payload = {
          sub: user.id.toString(),
          name: user.name,
          email: user.email,
          hash: user.hash,
        };
        return {
          access_token: await this.jwt.signAsync(payload),
        };
      }
    }
  }
}
