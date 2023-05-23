import { Controller, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  extractEmailFromToken(token: string): string {
    return this.jwtService.decode(token)['email'];
  }

  @Post('request-seller')
  roleChangeRequest(@Req() req: Request) {
    const token = req.cookies['token'];

    const email = this.extractEmailFromToken(token);

    return this.usersService.roleChangeRequest(email);
  }
}
