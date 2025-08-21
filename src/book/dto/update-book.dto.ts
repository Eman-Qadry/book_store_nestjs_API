import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateBookDto {
  @ApiPropertyOptional({
    description: 'The title of the book',
    example: 'Clean Code',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'A short description of the book',
    example: 'A handbook of agile software craftsmanship',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'The price of the book (must be non-negative)',
    example: 29.99,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({
    description: 'The available stock quantity',
    example: 100,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @ApiPropertyOptional({
    description: 'URL of the book cover image',
    example: 'https://example.com/book-cover.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'The ID of the author who wrote the book',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  authorId?: number;

  @ApiPropertyOptional({
    description: 'The ID of the category the book belongs to',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
