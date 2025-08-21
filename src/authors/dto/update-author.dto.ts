import { IsString,IsOptional } from "class-validator";
import {  ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateAuthorDto {
  @ApiPropertyOptional({
    description: 'The name of the author',
    example: 'Jane Austen',
  })
  @IsOptional()
  @IsString()
  name?: string;
@ApiPropertyOptional({
  description: 'A short biography of the author',
  example: 'Jane Austen was an English novelist known for her six major novels.',
})
  @IsOptional()
  @IsString()
  bio?: string;
@ApiPropertyOptional({
  description: 'The image URL of the author',
  example: 'https://example.com/jane-austen.jpg',
})
  @IsOptional()
  @IsString()
  imageUrl?: string;
}