import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { BYPASS_AUTH_KEY } from "../auth/bypass-auth.decorator";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";

import { Reflector, REQUEST } from "@nestjs/core";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}


  async use(req: Request, res: Response, next: NextFunction) {
    console.log(req.route?.stack?.[0]?.handle)
    const bypassAuth = this.reflector.get<boolean>(
      BYPASS_AUTH_KEY,
      req.route?.stack?.[0]?.handle
    );

    console.log('bypassAuth:', bypassAuth); // Debug log


    const token = req.headers['authorization'];
    if (token) {
      const bearerToken = token.replace('Bearer ', '');
      console.log(bearerToken)
      try {
        const decoded = this.jwtService.verify(bearerToken);
        console.log(decoded.role)
        req.user = {
          id: decoded.userId,
          roles: [decoded.role], // Change this line
        };
      } catch (error) {
        console.error('Invalid token:', error);
        res.status(401).send({ error: 'Invalid token' });
        return;
      }
    } else {
      res.status(401).send({ error: 'No token provided' });
      return;
    }
    next();
  }
}