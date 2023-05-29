import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Product } from 'src/database/entities';
import { OrderStatus } from '../../constants/orderstatus.enum';

export class PlaceOrderDto {
  // @IsDate()
  @IsNotEmpty()
  orderDate: Date;

  // @IsDate()
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
