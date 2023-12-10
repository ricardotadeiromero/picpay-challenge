import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  matchRoles(roles: string[], userRoles: string) {
    return roles.some((role) => role === userRoles);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    const authorized: boolean = this.matchRoles(roles, user.type);
    if (!user || !authorized) {
      throw new UnauthorizedException(
        'Usuário não possui permissão para acessar essa função!',
      );
    }

    return authorized;
  }
}
