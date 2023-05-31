import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
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
