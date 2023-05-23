import { BadRequestException, Body, Injectable, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from 'src/users/dtos/signin-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signUp(@Body() body: CreateUserDto) {
    //see if email is in use
    let user = await this.userService.findOneByEmail(body.email);

    if (user) {
      throw new BadRequestException('User with this email already exists!');
    }

    //hash the password
    const salt = 10;
    const hash = await bcrypt.hash(body.password, salt);

    //create user with hashed password
    user = await this.userService.create(
      body.username,
      body.email,
      body.phone,
      hash,
    );

    //generating jwt token
    const token = await this.jwtService.signAsync({ email: body.email });

    return { user, token };
  }

  async signIn(@Body() body: SignInUserDto) {
    //checking if email is valid or not
    const user = await this.userService.findOneByEmail(body.email);
    if (!user) {
      throw new BadRequestException('Wrong credentials!');
    }

    //checking password is valid or not
    const result = await bcrypt.compare(body.password, user.password);

    console.log(result);
    if (!result) {
      throw new BadRequestException('Wrong credentials!');
    }

    const token = await this.jwtService.signAsync({ email: user.email });

    return { user, token };
  }
}
