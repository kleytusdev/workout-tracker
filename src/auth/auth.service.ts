import { Injectable } from '@nestjs/common';
import { SignupDto } from './dtos';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(payload: SignupDto) {}
}
