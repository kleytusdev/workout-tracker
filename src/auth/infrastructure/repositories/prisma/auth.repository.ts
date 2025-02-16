import { Injectable } from "@nestjs/common";
import { AuthContractRepository } from "src/auth/domain/contracts/auth.contract.repository";
import { SignUpResponseDto } from "src/auth/domain/dtos/responses/sign-up.response.dto";
import { User } from "src/auth/domain/models/user.model";
import { hash } from 'bcrypt';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PrismaAuthRepository implements AuthContractRepository {
  constructor(
    private prisma: PrismaService
  ) {}

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
