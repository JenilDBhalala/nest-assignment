import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { OrderStatus } from 'src/constants/orderstatus.enum';

export class ChangeOrderStatusDto {
  @ApiProperty({
    type: String,
    description: 'order status : Pending or Processing or Shipped or Delivered',
    example: 'Processing',
  })
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;
}
