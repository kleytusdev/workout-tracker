import { User } from 'src/users/domain/entities/user.entity';
import { UserRepository } from 'src/users/domain/contracts/user.repository.interface';

export class GetUsersUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(): Promise<Array<User>> {
        const users = await this.userRepository.getAll();
        return users;
    }
}