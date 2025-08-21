import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateReviewDto {
  @ApiProperty({
    description: 'The ID of the book being reviewed',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @ApiProperty({
    description: 'The content of the review',
    example: 'This book was fantastic! Highly recommend it.',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
  @ApiProperty({
    description: 'The rating given in the review',
    example: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  rating: number;
}
