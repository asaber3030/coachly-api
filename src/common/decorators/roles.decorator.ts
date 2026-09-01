import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

/**
 * Restricts a route to the given roles. Must be combined with RolesGuard.
 * Usage: @Roles(Role.ADMIN)
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
