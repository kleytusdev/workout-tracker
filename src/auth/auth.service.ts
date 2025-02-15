import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, SignupDto } from './dtos';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './interfaces/user.interface';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {
  }

  async signUp(payload: SignupDto): Promise<User> {
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

  async signIn(payload: LoginDto): Promise<  { token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { username: payload.username },
    })

    const isValidCredentials = user && (await compare(payload.password, user.password));

    if (!isValidCredentials) throw new UnauthorizedException('Credenciales inválidas');

    return { token: await this.jwtService.signAsync({ payload }) }
  }
}
