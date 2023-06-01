import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity()
export class OrderDetails {
  @PrimaryColumn({ name: 'product_id' })
  productId: number;

  @PrimaryColumn({ name: 'order_id' })
  orderId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.orderDetails)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'productId' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;
}
