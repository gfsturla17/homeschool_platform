import { IsString, IsNumber } from 'class-validator';

export class LoginResponseDTO {
  @IsString()
  token: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  id: number;
}