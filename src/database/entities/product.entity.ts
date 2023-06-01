import { Order } from './order.entity';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { OrderDetails } from './order-details.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  name: string;

  @Column()
  price: number;

  // @ManyToMany(() => Order, (order) => order.products)
  // orders?: Order[];
  @OneToMany(() => OrderDetails, (orderDetail) => orderDetail.product)
  public orderDetails: OrderDetails[];
}
