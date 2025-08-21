import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AddToWishlistDto {
  @ApiProperty({
    description: 'The ID of the book to be added to the wishlist',
    example: 1,
  })
  @IsInt()
  bookId: number;
}
