import { IsEmail, IsNotEmpty } from 'class-validator';
export class RegisterTeacherDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}