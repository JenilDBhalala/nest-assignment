import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { OrderStatus } from 'src/constants';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class OrderItemsDTO {
  @ApiProperty({
    type: Number,
    description: 'id of product',
    example: 11,
  })
  @IsNumber()
  @IsPositive()
  productId: number;

  @ApiProperty({
    type: Number,
    description: 'quantity of product',
    example: 1001,
  })
  @IsNumber()
  @IsPositive()
  quantity: number;
}

export class PlaceOrderDto {
  @ApiProperty({
    type: Date,
    description: 'order place date',
    example: '2023-05-29',
  })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: `orderDate must be in YYYY-MM-DD format`,
  })
  @IsDateString()
  orderDate: Date;

  @ApiProperty({
    type: Date,
    description: 'expected delivery date of order',
    example: '2023-06-01',
  })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: `expectedDeliveryDate must be in YYYY-MM-DD format`,
  })
  @IsDateString()
  expectedDeliveryDate: Date;

  @ApiProperty({
    type: String,
    description: 'order status : Pending or Processing or Shipped or Delivered',
    example: 'Processing',
  })
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;

  @ApiProperty({
    type: String,
    description: 'shipping address of order',
    example: '40, ABC Apartment, XYZ road, Ahmedabad',
  })
  @IsString()
  @IsNotEmpty()
  shippingAddress: string;

  @ApiProperty({
    type: String,
    description:
      'products is array of objects in which two fields are there, productId and quantity',
    example: [
      { productId: 2, quantity: 1 },
      { productId: 3, quantity: 2 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemsDTO)
  products: OrderItemsDTO[];
}
