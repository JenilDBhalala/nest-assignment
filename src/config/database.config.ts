import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'jJ9510679933@',
  database: 'ecommerce',
  entities: [User, Product],
  synchronize: true,
};
