import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    description: 'The title of the book',
    example: 'Clean Code',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'A short description of the book',
    example: 'A handbook of agile software craftsmanship',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The price of the book (must be non-negative)',
    example: 29.99,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'The available stock quantity',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({
    description: 'URL of the book cover image',
    example: 'https://example.com/book-cover.jpg',
  })
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @ApiProperty({
    description: 'The ID of the author who wrote the book',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @ApiProperty({
    description: 'The ID of the category the book belongs to',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
