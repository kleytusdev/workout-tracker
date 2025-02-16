import { SignUpResponseDto } from "../dtos/responses/sign-up.response.dto"
import { User } from "../models/user.model"

export interface AuthContractRepository {
  signUp(user: User): Promise<SignUpResponseDto>
}
