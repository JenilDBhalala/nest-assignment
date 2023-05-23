import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from './users.service';
import { UserRequest } from '../entities/user-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRequest])],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService],
})
export class UsersModule {}
