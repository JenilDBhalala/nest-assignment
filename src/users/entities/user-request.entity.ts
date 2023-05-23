import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;
}
