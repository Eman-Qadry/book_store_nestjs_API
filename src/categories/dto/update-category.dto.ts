import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateCategoryDto {
  @ApiPropertyOptional({
    description: 'The name of the category',
    example: 'Programming',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'A short description of the category',
    example: 'Books related to programming and software development',
  })
  @IsString()
  @IsOptional()
  description?: string; // Optional field for category description
}
