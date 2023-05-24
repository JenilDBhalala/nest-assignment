import { Type } from 'class-transformer';
import { Product } from 'src/products/entities/product.entity';

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatus } from '../constants/orderstatus.enum';

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
}
