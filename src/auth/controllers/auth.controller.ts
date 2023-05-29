import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, SignInUserDto } from 'src/users/dtos';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';


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
