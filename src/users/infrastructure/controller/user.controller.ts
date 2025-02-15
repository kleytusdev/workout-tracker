import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { CreateUserUseCase } from 'src/users/application/use-cases/create-user.use-case';
import { GetUserUseCase } from 'src/users/application/use-cases/get-user.use-case';
import { CreateUserRequest } from 'src/users/domain/dtos/request/create-user.request';
import { GetUsersUseCase } from '../../application/use-cases/get-users.use-case';
import { DataResponse } from 'src/common/domain/entities/data-response.entity';
import { User } from 'src/users/domain/entities/user.entity';
import { Response as CustomResponse } from 'src/common/domain/entities/response.entity';
import { DeleteUserUseCase } from '../../application/use-cases/delete-use.use-case';

@Controller('users')
export class UserController {
    constructor(
        private readonly GetUsersUseCase: GetUsersUseCase,
        private readonly GetUserUseCase: GetUserUseCase,
        private readonly CreateUserUseCase: CreateUserUseCase,
        private readonly DeleteUserUseCase: DeleteUserUseCase,
    ) { }

    @Get('')
    async getUsers() {
        const users = await this.GetUsersUseCase.execute();
        return new DataResponse<User>(users);
    }

    @Get(':id')
    async getUser(@Param('id') id: number) {
        const user = await this.GetUserUseCase.execute(id);
        return new DataResponse<User|null>(user);
    }

    @Post('')
    async create(@Body() createUserDto: CreateUserRequest): Promise<any> {
        this.CreateUserUseCase.execute(createUserDto);
        return new CustomResponse(true, 200, 'Usuario registrado');
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        this.DeleteUserUseCase.execute(id);
        return new CustomResponse(true, 200, 'Usuario borrado');
    }
}