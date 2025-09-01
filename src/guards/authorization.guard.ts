import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JWTObject, JWTPayLoad } from 'src/types/types';
import { CookiesName } from 'src/types/enums';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context
      .switchToHttp()
      .getRequest<Request & { user: JWTPayLoad<JWTObject> }>();
    const token = req.cookies[CookiesName.Jwt_Token];
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = this.jwtService.verify<JWTPayLoad<JWTObject>>(
        token as string,
      );
      if (payload.iat) {
        delete payload.iat;
      }
      if (payload.exp) {
        delete payload.exp;
      }

      req.user = payload;
      return true;
    } catch (err) {
      if ((err as Error).name === 'TokenExpiredError') {
        throw new UnauthorizedException((err as Error).message);
      } else {
        throw new UnauthorizedException('invalid token');
      }
    }
  }
}
