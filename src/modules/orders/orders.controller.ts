import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CurrentUser } from 'src/core/decorators';
import { AdminGuard } from 'src/core/guards';
import { ChangeOrderStatusDto, PlaceOrderDto } from './dtos';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiBearerAuth('Authorization')
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiCreatedResponse({ description: 'order placed successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'product not found' })
  @Post()
  placeOrder(@Body() body: PlaceOrderDto, @CurrentUser() userId: number) {
    return this.ordersService.placeOrder(
      body.shippingAddress,
      userId,
      body.products,
    );
  }

  @ApiOkResponse({ description: 'success' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  viewOrders(@CurrentUser() userId: number) {
    return this.ordersService.viewOrders(userId);
  }

  @ApiOkResponse({ description: 'order-status changed successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'order not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  changeOrderStatus(
    @Param('id') id: number,
    @Body() body: ChangeOrderStatusDto,
  ) {
    return this.ordersService.changeOrderStatus(id, body.orderStatus);
  }
}
