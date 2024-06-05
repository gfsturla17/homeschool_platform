import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateTeacherProfileRequestDTO {
  @IsString()
  firstName: string = '';

  @IsString()
  lastName: string = '';

  @IsString()
  phone: string = '';

  @IsString()
  address: string = '';

  @IsString()
  city: string = '';

  @IsString()
  state: string = '';

  @IsString()
  biography: string = '';

  @IsString()
  tiktokLink: string = '';

  @IsString()
  twitterLink: string = '';

  @IsString()
  facebookLink: string = '';

  @IsString()
  instagramLink: string = '';
}