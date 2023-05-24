import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus } from '../constants/orderstatus.enum';
import { PlaceOrderDto } from '../dtos/place-order.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private orderRepo: Repository<Order>) {}

  placeOrder(
    orderDate: Date,
    expectedDeliveryDate: Date,
    orderStatus: OrderStatus,
    shippingAddress: string,
    userId: number,
  ) {
    const order = this.orderRepo.create({
      orderDate,
      expectedDeliveryDate,
      orderStatus,
      shippingAddress,
      userId,
    });

    return this.orderRepo.save(order);
  }
}
