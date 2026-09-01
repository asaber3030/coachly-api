import { User } from './user.entity';
import { BaseEntity } from './base.entity';
export declare class Progress extends BaseEntity {
    weight?: number;
    bodyFat?: number;
    muscleMass?: number;
    notes?: string;
    date: Date;
    user: User;
}
