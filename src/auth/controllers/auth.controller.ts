import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { SignInUserDto } from 'src/users/dtos/signin-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signUp(body);
    res.cookie('token', result.token, { httpOnly: true });
    return result.user;
  }

  @Post('signin')
  async signIn(
    @Body() body: SignInUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signIn(body);
    res.cookie('token', result.token, { httpOnly: true });
    return result.user;
  }

  @Post('signout')
  signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return 'logout successfully!';
  }

  @Post('signin/admin')
  async signInAdmin(
    @Body() body: SignInUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signInAdmin(body);
    res.cookie('token', result.token, { httpOnly: true });

    return result.email;
  }
}
