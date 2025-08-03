import { IsString,IsNotEmpty,IsOptional } from "class-validator";
export class UpdateAuthorDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}