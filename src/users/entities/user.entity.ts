import { Exclude } from 'class-transformer';
import { Role } from 'src/users/constants/roles.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: 0 })
  role: Role;
}
