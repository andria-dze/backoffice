import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CONFIG } from '../../../common/config/config';
import { IS_PUBLIC_KEY } from './public-guard.service';

@Injectable()
export class GraphqlAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req: Request = ctx.getContext().req; // Access the Express Request object

    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic || CONFIG.PARAMS.APP.ENV === 'dev') {
      return true;
    }

    // Check if the authorization header is present
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    // Verify the authorization token (Bearer token format)
    const [authType, token] = authHeader.split(' ');
    if (authType !== 'Bearer' || !token) {
      return false; // Invalid token format, deny access
    }

    try {
      await this.jwtService.verifyAsync(token, {
        secret: CONFIG.PARAMS.AUTH.JWT_SECRET,
      });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
