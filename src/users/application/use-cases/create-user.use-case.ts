import { User } from 'src/users/domain/entities/user.entity';
import { UserRepository } from 'src/users/domain/contracts/user.repository.interface';
import { CreateUserDto } from 'src/users/domain/dtos/request/create-user.request';

export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(dto: CreateUserDto): Promise<User> {
        const user = new User(dto.name, dto.email);
        await this.userRepository.save(user);
        return user;
    }
}