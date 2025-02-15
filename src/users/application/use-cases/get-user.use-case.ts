import { User } from 'src/users/domain/entities/user.entity';
import { UserRepository } from 'src/users/domain/contracts/user.repository.interface';
import { UserNotFoundException } from 'src/common/domain/exceptions/user-not-found.exception';

export class GetUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(userId: number): Promise<User | null> {
        const user = await this.userRepository.findById(userId);
        
        if (!user) throw new UserNotFoundException();

        return user;
    }
}