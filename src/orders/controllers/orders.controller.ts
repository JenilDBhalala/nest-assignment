import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PlaceOrderDto } from '../dtos/place-order.dto';
import { OrdersService } from '../services/orders.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { ChangeOrderStatusDto } from '../dtos/change-order-status.dto';
import { OrderStatus } from 'src/constants/orderstatus.enum';

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
