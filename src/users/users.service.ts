import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './users.dto';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async resgister({ hash, email, name }: CreateUserDto) {
    const hasedPassword = await argon.hash(hash);

    const user = this.prisma.user.create({
      data: {
        email,
        name,
        hash: hasedPassword,
      },
    });
    delete (await user).hash;
    return user;
  }

  async userAlreadyExists(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
