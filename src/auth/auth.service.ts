import { Injectable } from '@nestjs/common';
import { SignupDto } from './dtos';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './interfaces/user.interface';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(payload: SignupDto): Promise<User> {
    payload.password = await hash(payload.password, 10);

    return await this.prisma.user.create({
      data: payload,
      select: {
        id: true,
        username: true,
        email: true
      }
    });
  }
}
