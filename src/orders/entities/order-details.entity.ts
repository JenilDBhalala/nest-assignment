import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class OrderDetails{
    @PrimaryColumn()
    productId : number;

    @PrimaryColumn()
    orderId : number;

    @Column()
    quantity : number;
}