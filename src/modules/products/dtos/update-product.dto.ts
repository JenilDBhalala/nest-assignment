import { IsNotEmpty, IsOptional, IsNumber, IsPositive } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;
}
