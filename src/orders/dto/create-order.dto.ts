import { IsArray, ValidateNested, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
class OrderItemDto {
  @ApiProperty({
    description: 'The ID of the book in the order',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @ApiProperty({
    description: 'The quantity of the book in the order',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
