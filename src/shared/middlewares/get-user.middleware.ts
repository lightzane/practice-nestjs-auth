import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class GetUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const jwt = req.cookies['token'];

    if (!jwt) {
      next(); // allow the request to go through
      return;
    }

    // * Middleware inserts the decoded token to req['user'] 

    // inject Authorization headers in the request
    req.headers.authorization = `Bearer ${jwt}`;
    next();
  }
}
