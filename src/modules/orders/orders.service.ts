import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus } from 'src/constants';
import { TransactionService } from 'src/modules/transaction/transaction.service';
import { Order, Product, OrderDetails } from 'src/database/entities';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepo: Repository<OrderDetails>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private transactionService: TransactionService,
  ) {}

  async placeOrder(
    orderDate: Date,
    expectedDeliveryDate: Date,
    orderStatus: OrderStatus,
    shippingAddress: string,
    userId: number,
    products: any,
  ) {
    let queryRunner = await this.transactionService.startTransaction();
    try {
      //start transaction
      const order = this.orderRepo.create({
        orderDate,
        expectedDeliveryDate,
        orderStatus,
        shippingAddress,
        userId,
      });

      await queryRunner.manager.save(Order, order);

      await Promise.all(
        products.map(async (product) => {
          const item = await this.productRepo.findOne({where : {productId : product.productId}})
  
          if (!item)
            throw new BadRequestException(
              `product with id: ${product.productId} not found`,
            );

          const orderDetails = this.orderDetailsRepo.create({
            productId: product.productId,
            orderId: order.id,
            quantity: product.quantity,
          });

          await queryRunner.manager.save(OrderDetails, orderDetails);
        }),
      );

      //commit transaction
      await this.transactionService.commitTransaction(queryRunner);
      return order;
    } catch (err) {
      //rollback transaction
      await this.transactionService.rollbackTransaction(queryRunner);
      throw err;
    }
  }

  async viewOrders(userId: number) {
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
