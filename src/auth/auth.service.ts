import { BadRequestException, Body, Injectable, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from 'src/dtos/user/signin-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signUp(@Body() body: CreateUserDto) {
    //see if email is in use
    const users = await this.userService.find(body.email);

    if (users.length) {
      throw new BadRequestException('User with this email already exists!');
    }

    //hash the password
    const salt = 10;
    const hash = await bcrypt.hash(body.password, salt);

    //create user with hashed password
    const user = this.userService.create(
      body.username,
      body.email,
      body.phone,
      hash,
    );

    const token = this.jwtService.sign({ email: body.email });

    return { user, token };
  }

  signIn(@Body() body: SignInUserDto) {}
}
