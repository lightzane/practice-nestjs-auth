import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";


export const CustomRequest = createParamDecorator(
    (data: unknown, context: ExecutionContext) => context.switchToHttp().getRequest<Request>()
);
