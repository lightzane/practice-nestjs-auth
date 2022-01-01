import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class GetUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const jwt = req.cookies['token']; // cookies can be set in same area/place where the jwt is signed (see user.service.ts)

    if (!jwt) {
      next(); // allow the request to go through
      return;
    }

    // * Middleware inserts the decoded token to req['user'] 


    // to be consumed and validated by jwt.strategy.ts
    req.headers.authorization = `Bearer ${jwt}`; // ! inject Authorization headers in the request
    next();
  }
}
