import { SignInRequestDto } from "../dtos/requests/sign-in.request.dto"
import { SignInResponseDto } from "../dtos/responses/sign-in.response.dto"
import { SignUpResponseDto } from "../dtos/responses/sign-up.response.dto"
import { User } from "../models/user.model"

export interface AuthContractRepository {
  signIn(signInRequestDto: SignInRequestDto): Promise<SignInResponseDto>
  signUp(user: User): Promise<SignUpResponseDto>
}
