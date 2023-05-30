import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, SignInUserDto } from 'src/modules/users/dtos';
import { AuthService } from './auth.service';
import { Public } from 'src/core/decorators';

@UseInterceptors(ClassSerializerInterceptor)
@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: CreateUserDto) {
    return await this.authService.signUp(body);
  }

  @Post('signin')
  async signIn(@Body() body: SignInUserDto) {
    return await this.authService.signIn(body);
  }

  @Post('signin/admin')
  async signInAdmin(@Body() body: SignInUserDto) {
    return await this.authService.signInAdmin(body);
  }
}
