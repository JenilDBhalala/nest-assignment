import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from './constants/roles.enum';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create(username: string, email: string, phone: string, password: string) {
    const user = this.userRepo.create({
      username,
      email,
      phone,
      password,
    });
    return this.userRepo.save(user);
  }

  async findOneById(id: number) {
    if (!id) {
      throw new NotFoundException('User not found!');
    }

    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  findOneByEmail(email: string) {
    if (!email) {
      throw new NotFoundException('User not found!');
    }
    return this.userRepo.findOne({ where: { email } });
  }

  async update(id: number, attr: Partial<User>) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    Object.assign(user, attr);

    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return this.userRepo.remove(user);
  }
}
