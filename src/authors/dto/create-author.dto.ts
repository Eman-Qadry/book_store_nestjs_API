import { IsString,IsNotEmpty } from "class-validator";
export class CreateAuthorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  bio: string;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;
}