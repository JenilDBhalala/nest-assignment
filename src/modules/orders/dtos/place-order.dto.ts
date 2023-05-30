import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Product } from 'src/database/entities';
import { OrderStatus } from 'src/constants';
import { ApiProperty } from '@nestjs/swagger';
export class PlaceOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  orderDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  expectedDeliveryDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  shippingAddress: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  products: Product[];
}
