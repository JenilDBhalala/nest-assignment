import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { OrderStatus } from 'src/constants';
import { TransactionService } from 'src/modules/transaction/transaction.service';
import { Order, Product, OrderDetails } from 'src/database/entities';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderDetails)
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
    let queryRunner: QueryRunner;
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

  async viewOrders(userId: number) {
    // const orders = await this.orderRepo.find({ where: { userId } });
    const queryBuilder = this.orderRepo.createQueryBuilder('order');

    const orders = await queryBuilder
      .leftJoinAndSelect('order.products', 'products')
      .where('order.userId = :id', { id: userId })
      .getMany();

    return orders;
  }

  async changeOrderStatus(id: number, orderStatus: OrderStatus) {
    const order = await this.orderRepo.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException('order with this id not exists!');
    }

    order.orderStatus = orderStatus;

    return this.orderRepo.save(order);
  }
}
