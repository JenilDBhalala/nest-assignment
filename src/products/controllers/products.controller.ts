import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { CreateProductDto, UpdateProductDto } from '../dtos';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @UseGuards(AdminGuard)
  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.productService.createProduct(body.name, body.price);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  updateProduct(@Param('id') id: number, @Body() body: UpdateProductDto) {
    return this.productService.updateProduct(id, body);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }

  @Get(':id')
  viewProduct(@Param('id') id: number) {
    return this.productService.viewProduct(id);
  }
}
