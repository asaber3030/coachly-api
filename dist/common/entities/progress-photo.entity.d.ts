import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";
export declare class ProgressPhoto extends BaseEntity {
    imageUrl: string;
    description?: string;
    user: User;
}
