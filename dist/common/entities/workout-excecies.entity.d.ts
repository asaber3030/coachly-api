import { BaseEntity } from './base.entity';
import { Exercise } from './excersie.entity';
import { Workout } from './workout.entity';
export declare class WorkoutExercise extends BaseEntity {
    sets: number;
    reps: number;
    weight?: number;
    restSeconds?: number;
    workout: Workout;
    exercise: Exercise;
}
