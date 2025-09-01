import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Role } from 'src/decorators/classes-methods/role.decorator';
import { RolesE } from 'src/types/enums';
import { JWTObject } from 'src/types/types';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context
      .switchToHttp()
      .getRequest<Request & { user: JWTObject }>();
    const userData = req.user;
    const classRole = this.reflector.get(Role, context.getClass());
    const handlerRole = this.reflector.get(Role, context.getHandler());
    const role = handlerRole || classRole;

    console.log(userData.role);

    if (!role || (userData?.role && role?.includes(userData.role as RolesE))) {
      return true;
    }
    return false;
  }
}
