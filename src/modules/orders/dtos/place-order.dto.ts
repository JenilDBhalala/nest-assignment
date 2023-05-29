import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Product } from 'src/database/entities';
import { OrderStatus } from 'src/constants';
export class PlaceOrderDto {
  @IsNotEmpty()
  orderDate: Date;

  @IsNotEmpty()
  expectedDeliveryDate: Date;

  @IsNotEmpty()
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;

  @IsString()
  @IsNotEmpty()
  shippingAddress: string;

  @IsArray()
  @ValidateNested({ each: true })
  products: Product[];
}
