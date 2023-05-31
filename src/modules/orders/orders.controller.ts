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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@ApiBearerAuth('Authorization')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  
  @Post()
  placeOrder(@Body() body: PlaceOrderDto, @CurrentUser() userId: number) {
    return this.ordersService.placeOrder(
      body.shippingAddress,
      userId,
      body.products,
    );
  }

  @Get()
  viewOrders(@CurrentUser() userId: number) {
    return this.ordersService.viewOrders(userId);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  changeOrderStatus(
    @Param('id') id: number,
    @Body() body: ChangeOrderStatusDto,
  ) {
    return this.ordersService.changeOrderStatus(id, body.orderStatus);
  }
}
