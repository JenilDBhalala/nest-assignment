import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.productService.createProduct(body.name, body.price);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: number, @Body() body: UpdateProductDto) {
    return this.productService.updateProduct(id, body);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }

  @Get(':id')
  viewProduct(@Param('id') id: number) {
    return this.productService.viewProduct(id);
  }
}
