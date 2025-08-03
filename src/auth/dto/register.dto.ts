import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';
export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
  
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  role: string = 'customer';
}
