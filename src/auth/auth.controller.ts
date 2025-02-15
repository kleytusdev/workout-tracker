import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { SignupDto } from './dtos';
import { AuthService } from './auth.service';
import { UniqueUserPipe } from './validators/unique-user.validator';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UsePipes(UniqueUserPipe)
  async signup(@Body() signupDto: SignupDto) {
    console.log(signupDto);
    return await this.authService.signup(signupDto);
  }
}
