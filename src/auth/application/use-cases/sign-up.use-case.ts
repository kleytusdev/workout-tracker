import { AuthFactory } from "../factories/auth.factory";
import { SignUpRequestDto } from "src/auth/domain/dtos/requests/sign-up.request.dto";
import { SignUpResponseDto } from "src/auth/domain/dtos/responses/sign-up.response.dto";
import { AuthContractRepository } from "src/auth/domain/contracts/auth.contract.repository";

export class SignUpUseCase {
  constructor(
    private readonly repository: AuthContractRepository
  ) { }

  async handler(signUpRequestDto: SignUpRequestDto): Promise<SignUpResponseDto> {
    return await this.repository.signUp(AuthFactory.signUp(signUpRequestDto));
  }
}
