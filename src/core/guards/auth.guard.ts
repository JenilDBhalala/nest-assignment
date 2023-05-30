import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authorizationHeader = request.headers.authorization;
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      const token = authorizationHeader.split(' ')[1];

      try {
        const payload = await this.jwtService.verifyAsync(token);
        const user = await this.userService.findOneByEmail(payload.email);
        request.user = user;
        return true;
      } catch (error) {
        //if token verification goes wrong
        return false;
      }
    }

    //no authorization header found in the request
    return false;
  }
}
