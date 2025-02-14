import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dtos';

@Controller()
export class AuthController {
  @Post('/signup')
  signup(@Body() signupDto: SignupDto) {

  }
}
