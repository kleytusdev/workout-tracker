import { Injectable } from '@nestjs/common';
import { SignupDto } from './dtos';

@Injectable()
export class AuthService {
  async signup(payload: SignupDto) {}
}
