import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "src/user/entities/user";
import { AuthRequest } from "../entities/authRequest";


export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);