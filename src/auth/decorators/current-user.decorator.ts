import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const CurrentUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const jwtService = new JwtService({ secret: 'THISISTOPSECRET' });

    const token = request.cookies['token'];

    const payload = await jwtService.verifyAsync(token);

    return payload.id;
  },
);
