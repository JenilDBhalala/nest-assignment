import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    type: String,
    description: 'name of the product',
    example: 'product1',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'price of product',
    example: 8999,
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;
}
