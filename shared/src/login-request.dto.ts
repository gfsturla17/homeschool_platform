import { IsEmail, IsNotEmpty } from "class-validator";
export class LoginRequestDTO {

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  role: 'teacher' | 'parent';
}