import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, SignInUserDto } from 'src/modules/users/dtos';
import { AuthService } from './auth.service';
import { Public } from 'src/core/decorators';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({ description: 'Signup successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('signup')
  async signUp(@Body() body: CreateUserDto) {
    return await this.authService.signUp(body);
  }

  @ApiCreatedResponse({ description: 'Signin successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('signin')
  async signIn(@Body() body: SignInUserDto) {
    return await this.authService.signIn(body);
  }

  @ApiCreatedResponse({ description: 'Signin successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('signin/admin')
  async signInAdmin(@Body() body: SignInUserDto) {
    return await this.authService.signInAdmin(body);
  }
}
