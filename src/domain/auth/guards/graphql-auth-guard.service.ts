import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CONFIG } from '../../../infra/config/config';

@Injectable()
export class GraphqlAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req: Request = ctx.getContext().req; // Access the Express Request object

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
