import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { OrderStatus } from 'src/constants/orderstatus.enum';

export class ChangeOrderStatusDto {
  @ApiProperty()
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;
}
