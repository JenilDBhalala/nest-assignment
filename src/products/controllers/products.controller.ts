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
import { IsAdminGuard } from 'src/auth/guards/admin.guard';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @UseGuards(IsAdminGuard)
  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.productService.createProduct(body.name, body.price);
  }

  @UseGuards(IsAdminGuard)
  @Patch(':id')
  updateProduct(@Param('id') id: number, @Body() body: UpdateProductDto) {
    return this.productService.updateProduct(id, body);
  }

  @UseGuards(IsAdminGuard)
  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }

  @Get(':id')
  viewProduct(@Param('id') id: number) {
    return this.productService.viewProduct(id);
  }
}
