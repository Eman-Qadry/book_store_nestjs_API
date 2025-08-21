import { IsEnum } from 'class-validator';
import { OrderStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class UpdateOrderStatusDto {
  @ApiProperty({
    description: 'The ID of the order to update',
    example: 1,
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
