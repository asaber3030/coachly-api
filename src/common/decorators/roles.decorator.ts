import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from '../enums/user.enum';

export const ROLES_KEY = 'roles';

/**
 * Restricts a route to the given roles. Must be combined with RolesGuard.
 * Usage: @Roles(Role.ADMIN)
 */
export const Roles = (...roles: UserRoleEnum[]) => SetMetadata(ROLES_KEY, roles);
