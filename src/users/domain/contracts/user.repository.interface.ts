import { User } from 'src/users/domain/entities/user.entity';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepository {

    getAll(): Promise<Array<User>>;

    findById(id: number): Promise<User | null>;

    save(user: User): Promise<User>;

    delete(userId: number): Promise<void>;
}