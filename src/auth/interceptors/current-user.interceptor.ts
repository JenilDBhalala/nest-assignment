import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class CurrentUser implements NestInterceptor {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies('token');
    const payload = await this.jwtService.verifyAsync(token);
    const user = await this.userService.findOneByEmail(payload.email);
    request.user = user;
    return next.handle();
  }
}
