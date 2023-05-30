import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, SignInUserDto } from 'src/modules/users/dtos';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from 'src/core/guards/auth.guard';

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

  @UseGuards(AuthGuard)
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
