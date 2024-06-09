import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';
import { JwtService } from "@nestjs/jwt";
import { GqlExecutionContext } from "@nestjs/graphql";



@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const isHttp = context.getType() === 'http';
    const request = isHttp
      ? context.switchToHttp().getRequest()
      : GqlExecutionContext.create(context).getContext().req;

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const token = request.headers.authorization.split(' ')[1];
    const payload = this.jwtService.decode(token);

    return requiredRoles.some((role) => payload.roles.map((r) => r.toLowerCase()).includes(role.toLowerCase()));
  }
}

