import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Programming',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'A short description of the category',
    example: 'Books related to programming and software development',
  })
  @IsString()
  description?: string; // Optional field for category description
}
