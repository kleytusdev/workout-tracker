import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthContractRepository } from "src/auth/domain/contracts/auth.contract.repository";
import { SignUpResponseDto } from "src/auth/domain/dtos/responses/sign-up.response.dto";
import { User } from "src/auth/domain/models/user.model";
import { hash, compare } from 'bcrypt';
import { PrismaService } from "src/prisma/prisma.service";
import { SignInResponseDto } from "src/auth/domain/dtos/responses/sign-in.response.dto";
import { SignInRequestDto } from "src/auth/domain/dtos/requests/sign-in.request.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class PrismaAuthRepository implements AuthContractRepository {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) { }

  async signIn(signInRequestDto: SignInRequestDto): Promise<SignInResponseDto> {
    const user = await this.prisma.user.findUnique({ where: { username: signInRequestDto.username } })

    const isValidCredentials = user && (await compare(signInRequestDto.password, user.password));

    if (!isValidCredentials) throw new UnauthorizedException('Credenciales inválidas');

    return { token: await this.jwt.signAsync({ signInRequestDto }) }
  }

  async signUp(user: User): Promise<SignUpResponseDto> {
    user.password = await hash(user.password, 10);

    return await this.prisma.user.create({
      data: user,
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true
      }
    });
  }
}
