import { OrderDetails } from './../entities/order-details.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus } from '../constants/orderstatus.enum';
import { PlaceOrderDto } from '../dtos/place-order.dto';
import { Order } from '../entities/order.entity';
import { Product } from './../../products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private orderRepo: Repository<Order>,
  @InjectRepository(OrderDetails) private orderDetailsRepo : Repository<OrderDetails>) {}

  placeOrder(
    orderDate: Date,
    expectedDeliveryDate: Date,
    orderStatus: OrderStatus,
    shippingAddress: string,
    userId: number,
    products: Partial<Product>[]
  ) {
    const order = this.orderRepo.create({
      orderDate,
      expectedDeliveryDate,
      orderStatus,
      shippingAddress,
      userId,
    });

    console.log(order)
    products.forEach((product) => (product['orderId'] =  order.id))
    console.log(products)
    // this.orderDetailsRepo.save(products);
    // const queryBuilder = this.orderDetailsRepo.createQueryBuilder();

    // queryBuilder.insert().into(OrderDetails).values(products)

    return this.orderRepo.save(order);;
  }
}
