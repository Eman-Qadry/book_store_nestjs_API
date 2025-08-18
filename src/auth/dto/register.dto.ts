import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';
export class RegisterDto {
    @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
  
  @IsString()
  role: string = 'customer';
}
