import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SignInUserDto } from 'src/dtos/user/signin-user.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signUp(body);
    res.cookie('token', user.token, { httpOnly: true });
    return user.user;
  }

  @Post('signin')
  async signIn(@Body() body: SignInUserDto, @Req() request: Request) {
    const token = request.cookies['token'];
    return this.authService.signIn(body);
  }
}
