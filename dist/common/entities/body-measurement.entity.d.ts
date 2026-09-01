import { User } from './user.entity';
import { BaseEntity } from './base.entity';
export declare class BodyMeasurement extends BaseEntity {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
    date: Date;
    user: User;
}
