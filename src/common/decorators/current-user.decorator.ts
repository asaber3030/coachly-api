import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Injects the authenticated user (attached to the request by JwtStrategy) into a route handler.
 * Usage: findMe(@CurrentUser() user: AuthenticatedUser)
 */
export const CurrentUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;
  return data ? user?.[data] : user;
});
