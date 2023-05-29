import { Type } from 'class-transformer';
import { Product } from './product.entity';

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from '../../constants/orderstatus.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  orderDate: Date;

  @Type(() => Date)
  @Column({ type: 'date' })
  expectedDeliveryDate: Date;

  @Column()
  orderStatus: OrderStatus;

  @Column()
  shippingAddress: string;

  @Column()
  userId: number;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'order_details',
    joinColumn: {
      name: 'order_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'productId',
    },
  })
  products: Product[];
}
