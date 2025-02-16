import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { SignUpUseCase } from 'src/auth/application/use-cases/sign-up.use-case';
import { SignUpRequestDto } from 'src/auth/domain/dtos/requests/sign-up.request.dto';
import { SignUpResponseDto } from 'src/auth/domain/dtos/responses/sign-up.response.dto';
import { UniqueUserPipe } from '../pipes/unique-user.pipe';
import { SignInUseCase } from 'src/auth/application/use-cases/sign-in.use-case';
import { SignInRequestDto } from 'src/auth/domain/dtos/requests/sign-in.request.dto';
import { SignInResponseDto } from 'src/auth/domain/dtos/responses/sign-in.response.dto';

@Controller()
export class AuthController {
  constructor(
    private signInUseCase: SignInUseCase,
    private signUpUseCase: SignUpUseCase
  ) {
  }

  @Post('signin')
  @HttpCode(200)
  async signIn(@Body() signInRequestDto: SignInRequestDto): Promise<SignInResponseDto> {
    return await this.signInUseCase.handler(signInRequestDto);
  }

  @Post('signup')
  @UsePipes(UniqueUserPipe)
  async signUp(@Body() signUpRequestDto: SignUpRequestDto): Promise<SignUpResponseDto> {
    return await this.signUpUseCase.handler(signUpRequestDto);
  }
}
