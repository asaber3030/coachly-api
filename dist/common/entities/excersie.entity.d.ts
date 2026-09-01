import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { ExerciseGroup } from './execrsie-group.entity';
export declare class Exercise extends BaseEntity {
    name: string;
    muscleGroup?: string;
    equipment?: string;
    picture?: string;
    video?: string;
    instructions?: string;
    isGlobal: boolean;
    group?: ExerciseGroup;
    createdBy?: User;
}
