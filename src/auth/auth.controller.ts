import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { LoginDto, SignupDto } from './dtos';
import { AuthService } from './auth.service';
import { UniqueUserPipe } from './validators/unique-user.validator';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(UniqueUserPipe)
  async signUp(@Body() signupDto: SignupDto) {
    return await this.authService.signUp(signupDto);
  }

  @Post('signin')
  @HttpCode(200)
  async signIn(@Body() LoginDto: LoginDto) {
    return await this.authService.signIn(LoginDto);
  }
}
