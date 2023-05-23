import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserRequest } from 'src/users/entities/user-request.entity';
import { User } from 'src/users/entities/user.entity';

export const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'jJ9510679933@',
  database: 'ecommerce',
  entities: [User, UserRequest],
  synchronize: true,
  // dropSchema: true,
};
