import{IsInt, Min} from 'class-validator';
export class AddToWishlistDto {
  @IsInt()
  bookId: number;
}