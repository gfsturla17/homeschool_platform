import { IsEmail, IsNotEmpty } from 'class-validator';
export class RegisterTeacherDTO {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  yearsOfExperience: number;

  @IsNotEmpty()
  password: string;
}