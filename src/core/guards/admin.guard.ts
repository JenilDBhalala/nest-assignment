import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/constants/roles.enum';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UsersService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get('isPublic', context.getClass());
    const isPublicRoute = this.reflector.get('isPublic', context.getHandler());

    if (isPublic || isPublicRoute) return true;

    const request = context.switchToHttp().getRequest();

    const authorizationHeader = request.headers.authorization;
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      const token = authorizationHeader.split(' ')[1];

      try {
        const payload = await this.jwtService.verifyAsync(token);
        const user = await this.userService.findOneByEmail(payload.email);
        request.user = user;

        if (user.role === Role.admin) return true;
      } catch (error) {
        //if token verification goes wrong
        return false;
      }
    }

    //no authorization header found in the request
    return false;
  }
}
