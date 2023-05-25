import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/constants/roles.enum';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.cookies['token'];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.userService.findOneByEmail(payload.email);
      request.user = user;
      if (user.role === Role.admin) return true;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }

    return false;
  }
}
