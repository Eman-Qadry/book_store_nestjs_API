import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user @example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({
    description: 'The password of the user',
    example: 'securepassword123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
