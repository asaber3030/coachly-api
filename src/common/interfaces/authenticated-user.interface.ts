import { UserRoleEnum } from '../enums/user.enum';

export interface AuthenticatedUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRoleEnum;
}
