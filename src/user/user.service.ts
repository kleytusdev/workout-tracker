import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService
  ) {
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true
      }
    });
  }
}
