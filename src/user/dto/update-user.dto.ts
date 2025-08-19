import {} from 'class-validator';
import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
