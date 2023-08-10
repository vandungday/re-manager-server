import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtGuard } from './jwt.guard';
import { Reflector } from '@nestjs/core';
import { AUTH_TYPE_KEY } from '@/common/constants/auth.constant';
import { AuthType } from '@/common/enums/auth.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtGuard: JwtGuard,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authType =
      this.reflector.get<string>(AUTH_TYPE_KEY, context.getHandler()) ||
      AuthType.Jwt;

    if (authType === AuthType.Jwt) return this.jwtGuard.canActivate(context);

    return true;
  }
}
