import { IsString,IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CreateAuthorDto {
  @ApiProperty({
    description: 'The name of the author',
    example: 'Jane Austen',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
@ApiProperty
  ({
    description: 'A short biography of the author',
    example: 'Jane Austen was an English novelist known for her six major novels.',
  })
  @IsNotEmpty()
  @IsString()
  bio: string;
@ApiProperty({
  description: 'The image URL of the author',
  example: 'https://example.com/jane-austen.jpg',
})
  @IsNotEmpty()
  @IsString()
  imageUrl: string;
}