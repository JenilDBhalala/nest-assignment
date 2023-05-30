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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/decorators';
import { AdminGuard } from 'src/core/guards/admin.guard';
import { CreateProductDto, UpdateProductDto } from './dtos';
import { ProductsService } from './products.service';

@ApiTags('Products')
@ApiBearerAuth('Authorization')
@UseGuards(AdminGuard)
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

  @Public()
  @Get(':id')
  viewProduct(@Param('id') id: number) {
    return this.productService.viewProduct(id);
  }
}
