import { BaseEntity } from './base.entity';
import { User } from './user.entity';
export declare class Invitation extends BaseEntity {
    token: string;
    email: string;
    isAccepted: boolean;
    expiresAt: Date;
    coach: User;
    user?: User;
}
