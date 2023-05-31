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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from 'src/core/decorators';
import { AdminGuard } from 'src/core/guards/admin.guard';
import { CreateProductDto, UpdateProductDto } from './dtos';
import { ProductsService } from './products.service';

@ApiTags('Products')
@UseGuards(AdminGuard)
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @ApiBearerAuth('Authorization')
  @ApiCreatedResponse({ description: 'product added successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.productService.createProduct(body.name, body.price);
  }

  @ApiBearerAuth('Authorization')
  @ApiOkResponse({ description: 'product updated successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'product not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Patch(':id')
  updateProduct(@Param('id') id: number, @Body() body: UpdateProductDto) {
    return this.productService.updateProduct(id, body);
  }

  @ApiOkResponse({ description: 'product deleted successfully' })
  @ApiNotFoundResponse({ description: 'product not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth('Authorization')
  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }

  @ApiOkResponse({ description: 'success' })
  @ApiNotFoundResponse({ description: 'product not found' })
  @Public()
  @Get(':id')
  viewProduct(@Param('id') id: number) {
    return this.productService.viewProduct(id);
  }
}
