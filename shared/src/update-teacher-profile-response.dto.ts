import { IsEmail, IsNumber, IsString } from "class-validator";

export class UpdateTeacherProfileResponseDTO {
  @IsNumber()
  id!: number;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phone!: string;

  @IsString()
  address!: string;

  @IsString()
  city!: string;

  @IsString()
  state!: string;

  @IsString()
  biography!: string;

  @IsString()
  tiktokLink!: string;

  @IsString()
  twitterLink!: string;

  @IsString()
  facebookLink!: string;

  @IsString()
  instagramLink!: string;
}