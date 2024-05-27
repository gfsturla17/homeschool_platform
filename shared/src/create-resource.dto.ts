import { IsString } from "class-validator";

export class CreateResourceDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  resourceType: string;
}