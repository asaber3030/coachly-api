import { User } from './user.entity';
import { BaseEntity } from './base.entity';
export declare class ExerciseGroup extends BaseEntity {
    name: string;
    createdBy?: User;
}
