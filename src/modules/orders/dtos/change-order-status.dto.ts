import { IsEnum } from 'class-validator';
import { OrderStatus } from 'src/constants/orderstatus.enum';

export class ChangeOrderStatusDto {
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;
}
