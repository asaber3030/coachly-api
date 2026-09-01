import { User } from "./user.entity";
import { BaseEntity } from "./base.entity";
export declare class CoachClient extends BaseEntity {
    coach: User;
    client: User;
    isActive: boolean;
    startedAt: Date;
}
