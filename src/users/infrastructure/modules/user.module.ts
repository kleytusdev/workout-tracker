import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { USER_REPOSITORY } from 'src/users/domain/contracts/user.repository.interface';
import { NoDbUserRepositoryImpl } from '../persistence/no-db.user.repository.impl';
import { GetUserUseCase } from 'src/users/application/use-cases/get-user.use-case';
import { CreateUserUseCase } from 'src/users/application/use-cases/create-user.use-case';
import { GetUsersUseCase } from 'src/users/application/use-cases/get-users.use-case';
import { DeleteUserUseCase } from 'src/users/application/use-cases/delete-use.use-case';

const useCases = [
    GetUsersUseCase,
    GetUserUseCase,
    CreateUserUseCase,
    DeleteUserUseCase
];

@Module({
    controllers: [UserController],
    providers: [
        {
            provide: USER_REPOSITORY,
            useClass: NoDbUserRepositoryImpl
        },
        ...useCases.map(useCase => ({
            provide: useCase,
            useFactory: (userRepository: NoDbUserRepositoryImpl) => new useCase(userRepository),
            inject: [USER_REPOSITORY],
        })),
    ],
    exports: [GetUserUseCase]
})
export class UserModule { }
