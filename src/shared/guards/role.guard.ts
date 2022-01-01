import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { User } from '../../user/models/user.dto';

@Injectable()
export class RoleGuard implements CanActivate {

  // * allowedRoles will be populated in admin-role.guard.ts
  // or from UseGuards(new RoleGuard(['admin']))
  constructor(private allowedRoles: string[]) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const user: User = request.user['user']; // * req.user is populated in the middleware and returns { user: <decodedJwtToken> }

    const allowed = this.isAllowed(user.roles);

    if (!allowed) throw new ForbiddenException('User is not allowed to delete');

    return true;
  }

  isAllowed(userRoles: string[]): boolean {
    let allowed = false;

    for (let role of userRoles) {
      if (!allowed && this.allowedRoles.includes(role)) {
        allowed = true;
        break;
      }
    }

    return allowed;
  }
}
