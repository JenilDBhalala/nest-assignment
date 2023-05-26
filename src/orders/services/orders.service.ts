import { OrderDetails } from './../entities/order-details.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus } from '../../constants/orderstatus.enum';
import { Order } from '../entities/order.entity';
import { Product } from './../../products/entities/product.entity';
import { TransactionService } from 'src/transaction/transaction.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepo: Repository<OrderDetails>,
    private transactionService: TransactionService,
  ) {}

  async placeOrder(
    orderDate: Date,
    expectedDeliveryDate: Date,
    orderStatus: OrderStatus,
    shippingAddress: string,
    userId: number,
    products: Partial<Product>[],
  ) {
    let queryRunner;
    try {
      //start transaction
      queryRunner = await this.transactionService.startTransaction();

      const order = this.orderRepo.create({
        orderDate,
        expectedDeliveryDate,
        orderStatus,
        shippingAddress,
        userId,
      });

      await queryRunner.manager.save(Order, order);

      products.forEach((product) => (product['orderId'] = order.id));
      const orderDetails = await queryRunner.manager.save(
        OrderDetails,
        products,
      );

      //commit transaction
      await this.transactionService.commitTransaction(queryRunner);
      return orderDetails;
    } catch (err) {
      //rollback transaction
      await this.transactionService.rollbackTransaction(queryRunner);
      throw err;
    }
  }

  async viewOrder() {
    return;
  }
}
