import { Order } from 'src/orders/entities/order.entity';
import { Column, PrimaryGeneratedColumn, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToMany(() => Order, (order) => order.products)
  orders: Order[];
}
