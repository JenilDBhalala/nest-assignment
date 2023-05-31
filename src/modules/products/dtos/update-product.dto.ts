import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsPositive } from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({
    type: String,
    description: 'name of product',
    example: 'product1',
  })
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'price of product',
    example: 8999,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;
}
