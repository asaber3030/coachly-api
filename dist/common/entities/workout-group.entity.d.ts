import { BaseEntity } from './base.entity';
import { Workout } from './workout.entity';
export declare class WorkoutGroup extends BaseEntity {
    name: string;
    picture?: string;
    video?: string;
    workout: Workout;
}
