import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { WorkoutExercise } from './workout-excecies.entity';
import { WorkoutGroup } from './workout-group.entity';
export declare class Workout extends BaseEntity {
    name: string;
    description?: string;
    isGlobal: boolean;
    createdBy?: User;
    picture?: string;
    video?: string;
    group: WorkoutGroup;
    exercises: WorkoutExercise[];
}
