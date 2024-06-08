import { Injectable, ExecutionContext, UnauthorizedException, CanActivate } from "@nestjs/common";
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { BYPASS_AUTH_KEY } from "./bypass-auth.decorator";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isHttp = context.getType() === 'http';
    const request = isHttp
      ? context.switchToHttp().getRequest()
      : GqlExecutionContext.create(context).getContext().req;

    const bypassAuth = this.reflector.get<boolean>(BYPASS_AUTH_KEY, context.getHandler());

    if (bypassAuth) {
      return true;
    }

    const token = request.headers['authorization'];
    if (token) {
      const bearerToken = token.replace('Bearer ', '');
      try {
        const decoded = this.jwtService.verify(bearerToken);
        request.user = {
          id: decoded.userId,
          roles: [decoded.role],
        };
        return true;
      } catch (error) {
        console.error('Invalid token:', error);
        return false;
      }
    } else {
      return false;
    }
  }
}
