import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') { // arg = PassportStrategy name (2nd arg) -- see jwt.strategy.ts
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // super calls AuthGuard('jwt') -- jwt.strategy.ts
    // passes the context
    // and returns the result from that strategy
    return super.canActivate(context);
  }

  /**
   * (OPTIONAL) for customization
   * @param err 
   * * @param user - the same payload that is coming from validate() from jwt.strategy.ts
   * @param info 
   * @returns user
   */
  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
