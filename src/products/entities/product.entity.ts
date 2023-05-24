import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  name: string;

  @Column()
  price: number;
}
