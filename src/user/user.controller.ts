import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService
  ) {
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
