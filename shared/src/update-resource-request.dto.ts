import { IsOptional, IsString } from "class-validator";

export class UpdateResourceRequestDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}