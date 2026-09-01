import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";
export declare class UserProfile extends BaseEntity {
    phone?: string;
    height?: number;
    birthDate?: Date;
    gender?: string;
    avatar?: string;
    goal?: string;
    user: User;
}
