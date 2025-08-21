import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AddToCartDto {
  @ApiProperty({
    description: 'The ID of the book to be added to the cart',
    example: 1,
  })
  @IsInt()
  bookId: number;

  @ApiProperty({
    description: 'The quantity of the book to be added to the cart',
    example: 2,
  })
  @IsInt()
  @Min(1)
  quantity: number;
}
