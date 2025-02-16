import { SignUpRequestDto } from "src/auth/domain/dtos/requests/sign-up.request.dto";
import { User } from "src/auth/domain/models/user.model";

export class AuthFactory {
  static signUp(signUpRequestDto: SignUpRequestDto): User {
    return new User(signUpRequestDto.email, signUpRequestDto.username, signUpRequestDto.password);
  }
}
