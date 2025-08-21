import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';
export class UpdateReviewDto {
 
  @ApiPropertyOptional({
    description: 'The content of the review',
    example: 'This book was fantastic! Highly recommend it.',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description: 'The rating given in the review',
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  rating?: number;
}
