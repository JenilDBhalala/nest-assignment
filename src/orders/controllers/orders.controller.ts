import { Product } from './../../products/entities/product.entity';
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
    console.log(userId)
    return this.ordersService.placeOrder(
      body.orderDate,
      body.expectedDeliveryDate,
      body.orderStatus,
      body.shippingAddress,
      userId,
      body.products
    );
  }
}
