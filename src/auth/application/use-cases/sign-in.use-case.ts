import { AuthContractRepository } from "src/auth/domain/contracts/auth.contract.repository";
import { SignInResponseDto } from "src/auth/domain/dtos/responses/sign-in.response.dto";
import { SignInRequestDto } from "src/auth/domain/dtos/requests/sign-in.request.dto";

export class SignInUseCase {
  constructor(
    private readonly repository: AuthContractRepository
  ) { }

  async handler(signInRequestDto: SignInRequestDto): Promise<SignInResponseDto> {
    return await this.repository.signIn(signInRequestDto);
  }
}
