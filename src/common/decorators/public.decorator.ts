import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Marks a route/controller as not requiring authentication.
 * Usage: @Public() above a controller method (auth is required globally by default).
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
