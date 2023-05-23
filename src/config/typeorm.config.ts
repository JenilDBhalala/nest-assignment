import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

export const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'jJ9510679933@',
  database: 'ecommerce',
  entities: [User],
  synchronize: true,
  // dropSchema: true,
};
