import { OrderDetails } from './../entities/order-details.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus } from '../../constants/orderstatus.enum';
import { Order } from '../entities/order.entity';
import { Product } from './../../products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepo: Repository<OrderDetails>,
  ) {}

  async placeOrder(
    orderDate: Date,
    expectedDeliveryDate: Date,
    orderStatus: OrderStatus,
    shippingAddress: string,
    userId: number,
    products: Partial<Product>[],
  ) {
    const order = this.orderRepo.create({
      orderDate,
      expectedDeliveryDate,
      orderStatus,
      shippingAddress,
      userId,
    });

    try {
      await this.orderRepo.save(order);
    } catch (err) {
      throw new InternalServerErrorException();
    }

    products.forEach((product) => (product['orderId'] = order.id));

    return this.orderDetailsRepo.save(products);
  }

  async viewOrder() {
    return;
  }
}
