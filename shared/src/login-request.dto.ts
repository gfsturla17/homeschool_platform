import { IsEmail, IsNotEmpty } from "class-validator";
export class LoginTeacherRequestDTO {

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}