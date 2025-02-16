import { User } from "src/auth/domain/models/user.model";
import { UserEntity } from "../entities/user.entity";

export class AuthMapper {
  static toDomain(user: UserEntity): User {
    return new User(
      user.email,
      user.username,
      user.password,
      user.id,
    );
  }
}
