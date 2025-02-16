import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { SignUpUseCase } from 'src/auth/application/use-cases/sign-up.use-case';
import { SignUpRequestDto } from 'src/auth/domain/dtos/requests/sign-up.request.dto';
import { SignUpResponseDto } from 'src/auth/domain/dtos/responses/sign-up.response.dto';
import { UniqueUserPipe } from '../pipes/unique-user.pipe';

@Controller()
export class AuthController {
  constructor(
    private signUpUseCase: SignUpUseCase
  ) {
  }

  @Post('signup')
  @UsePipes(UniqueUserPipe)
  async signUp(@Body() signUpRequestDto: SignUpRequestDto): Promise<SignUpResponseDto> {
    return await this.signUpUseCase.handler(signUpRequestDto);
  }
}
