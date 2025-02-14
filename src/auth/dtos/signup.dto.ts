import { IsBoolean, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'El nombre de usuario debe tener al menos 2 caracteres' })
  username: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string


  @IsNotEmpty()
  @IsBoolean()
  blocked: boolean
}
