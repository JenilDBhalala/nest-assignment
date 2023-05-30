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
import { CurrentUser } from 'src/core/decorators/current-user.decorator';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { AdminGuard } from 'src/core/guards/admin.guard';
import { ChangeOrderStatusDto, PlaceOrderDto } from './dtos';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  placeOrder(@Body() body: PlaceOrderDto, @CurrentUser() userId: number) {
    return this.ordersService.placeOrder(
      body.orderDate,
      body.expectedDeliveryDate,
      body.orderStatus,
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
