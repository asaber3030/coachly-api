import { BaseEntity } from './base.entity';
import { UserRoleEnum } from '../enums/user.enum';
import { Invitation } from './invitation.entity';
import { UserProfile } from './user-profile.entity';
export declare class User extends BaseEntity {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRoleEnum;
    isActive: boolean;
    profile: UserProfile;
    sentInvitations: Invitation[];
    receivedInvitations: Invitation[];
}
