import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderDetails {
  @PrimaryColumn({ name: 'product_id' })
  productId: number;

  @PrimaryColumn({ name: 'order_id' })
  orderId: number;

  @Column()
  quantity: number;
}
