import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PlaceOrderDto } from '../dtos/place-order.dto';
import { OrdersService } from '../services/orders.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  placeOrder(@Body() body: PlaceOrderDto, @CurrentUser() userId: number) {
    return this.ordersService.placeOrder(
      new Date(body.orderDate),
      new Date(body.expectedDeliveryDate),
      body.orderStatus,
      body.shippingAddress,
      userId,
    );
  }
}