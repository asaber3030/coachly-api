import { UserRoleEnum } from '../enums/user.enum';

export interface JwtPayload {
  sub: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRoleEnum;
}
