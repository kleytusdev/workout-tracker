import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controllers/auth.controller';
import { SignUpUseCase } from 'src/auth/application/use-cases/sign-up.use-case';
import { PrismaAuthRepository } from '../repositories/prisma/auth.repository';
import { UserEntity } from '../entities/user.entity';

const useCases = [SignUpUseCase];

const useCaseProviders = useCases.map(useCase => ({
  provide: useCase,
  useFactory: (authRepository: PrismaAuthRepository) => new useCase(authRepository),
  inject: [PrismaAuthRepository],
}));

@Module({
  controllers: [AuthController],
  providers: [
    PrismaService,
    PrismaAuthRepository,
    UserEntity,
    ...useCaseProviders,
  ],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10h' }
    })
  ],
  exports: [...useCases],
})

export class AuthModule {}
