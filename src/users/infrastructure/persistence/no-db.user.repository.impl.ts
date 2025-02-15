import { Injectable } from "@nestjs/common";
import { User } from "src/users/domain/entities/user.entity";
import { UserRepository, USER_REPOSITORY } from "src/users/domain/contracts/user.repository.interface";

@Injectable()
export class NoDbUserRepositoryImpl implements UserRepository {

    public users: User[] = [];
    private idCounter = 1;

    async getAll(): Promise<User[]> {
        return this.users;
    }

    async findById(id: number): Promise<User | null> {
        const user = this.users.find(user => user.id == id) || null;
        return user;
    }

    async save(user: User): Promise<User> {
        if (!user.id) {
            user.id = this.idCounter++;
        }
        this.users.push(user);
        return user;
    }

    async delete(userId: number): Promise<void> {
        this.users = this.users.filter(user => user.id != userId);
    }
}