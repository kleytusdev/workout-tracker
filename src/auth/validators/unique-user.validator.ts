import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UniqueUserPipe implements PipeTransform {
  constructor(private prisma: PrismaService) {}

  async transform<T extends { email?: string; username?: string }>(value: T): Promise<T> {
    const { email, username } = value;

    if (!email || !username) return value;

    const existingUser = await this.prisma.user.findFirst({ where: { OR: [{ email }, { username }] } });

    if (existingUser) throw new BadRequestException(existingUser.email === email ? 'El email ya está en uso' : 'El nombre de usuario ya está en uso')

    return value;
  }
}
