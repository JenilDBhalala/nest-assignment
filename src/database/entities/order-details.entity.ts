import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class OrderDetails {
  @PrimaryColumn({ name: 'product_id' })
  productId: number;

  @PrimaryColumn({ name: 'order_id' })
  orderId: number;

  @Column()
  quantity: number;
}
